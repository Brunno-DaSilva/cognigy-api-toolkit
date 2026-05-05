import { useState, useCallback } from "react";
import { getTimestamp } from "../utils";

const useFetchLogs = () => {
  const [logs, setLogs]         = useState([]);
  const [terminal, setTerminal] = useState([]);
  const [running, setRunning]   = useState(false);
  const [done, setDone]         = useState(false);
  const [progress, setProgress] = useState({ fetched: 0, pages: 0, total: null, pct: 0 });

  const addLine = useCallback((msg, type = "") => {
    setTerminal((p) => [...p, { msg: `[${getTimestamp()}] ${msg}`, type }]);
  }, []);

  const reset = useCallback(() => {
    setLogs([]);
    setTerminal([]);
    setDone(false);
    setProgress({ fetched: 0, pages: 0, total: null, pct: 0 });
  }, []);

  const fetchAll = useCallback(async (cfg, types) => {
    reset();
    setRunning(true);

    const allLogs = [];
    let nextCursor = null;
    let page = 0;
    let total = null;

    const baseParams = new URLSearchParams();
    baseParams.set("startDate", new Date(cfg.startDate).toISOString());
    baseParams.set("endDate",   new Date(cfg.endDate).toISOString());
    baseParams.set("limit",     cfg.limit);
    baseParams.set("sort",      cfg.sort);
    if (cfg.filter)   baseParams.set("filter",   cfg.filter);
    if (cfg.flowName) baseParams.set("flowName", cfg.flowName);
    if (cfg.userId)   baseParams.set("userId",   cfg.userId);
    types.forEach((t) => baseParams.append("type", t));

    addLine(`Starting — project ${cfg.projectId}`, "info");
    addLine(`Types: ${types.length ? types.join(", ") : "all"} | limit: ${cfg.limit}/page`, "info");

    try {
      while (true) {
        page++;
        const params = new URLSearchParams(baseParams);
        if (nextCursor) params.set("next", nextCursor);

        const url = `${cfg.baseUrl.replace(/\/$/, "")}/new/v2.0/projects/${cfg.projectId}/logs?${params}`;
        addLine(`Page ${page} — fetching...`);

        const res = await fetch(url, {
          headers: { "X-API-Key": cfg.apiKey, Accept: "application/hal+json" },
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          addLine(`Error ${res.status}: ${err.detail || err.title || "Unknown"}`, "err");
          break;
        }

        const data = await res.json();
        const entries = data._embedded?.logEntry || data.items || [];

        if (total === null) total = data.total ?? null;

        allLogs.push(...entries);
        const fetched = allLogs.length;
        const pct = total ? Math.min(100, (fetched / total) * 100) : 0;

        setProgress({ fetched, pages: page, total, pct });
        setLogs([...allLogs]);
        addLine(`Page ${page} — ${entries.length} entries (${fetched} so far)`, "ok");

        if (entries.length === 0) { addLine("No more entries.", "ok"); break; }

        const nextHref = data._links?.next?.href;
        if (!nextHref) { addLine("All pages fetched!", "ok"); break; }

        const nextUrl  = new URL(nextHref);
        nextCursor = nextUrl.searchParams.get("next");
        if (!nextCursor) { addLine("No more pages.", "ok"); break; }

        await new Promise((r) => setTimeout(r, 150));
      }

      addLine(`✓ Complete — ${allLogs.length.toLocaleString()} entries`, "ok");
      setDone(true);
    } catch (e) {
      addLine(`Fatal: ${e.message}`, "err");
    } finally {
      setRunning(false);
    }
  }, [reset, addLine]);

  return { logs, terminal, running, done, progress, fetchAll };
};

export default useFetchLogs;
