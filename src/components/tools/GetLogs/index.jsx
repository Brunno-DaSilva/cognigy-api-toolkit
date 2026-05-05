import { useState } from "react";
import ApiConfig from "./ApiConfig";
import LogFilters from "./LogFilters";
import FetchProgress from "./FetchProgress";
import TypeBreakdown from "./TypeBreakdown";
import ActionBar from "./ActionBar";
import useFetchLogs from "../../../hooks/useFetchLogs";
import { DEFAULT_CFG } from "../../../constants";
import { toLocalDatetime, getYesterday, downloadJSON } from "../../../utils";

const GetLogs = () => {
  const [cfg, setCfg] = useState({
    ...DEFAULT_CFG,
    startDate: toLocalDatetime(getYesterday()),
    endDate:   toLocalDatetime(new Date()),
  });
  const [types, setTypes] = useState([]);

  const { logs, terminal, running, done, progress, fetchAll } = useFetchLogs();

  const handleChange = (key, value) =>
    setCfg((prev) => ({ ...prev, [key]: value }));

  const handleToggleType = (t) =>
    setTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const handleFetch = () => {
    if (!cfg.baseUrl || !cfg.projectId || !cfg.apiKey || !cfg.startDate || !cfg.endDate) {
      alert("Please fill in Base URL, Project ID, API Key, and date range.");
      return;
    }
    fetchAll(cfg, types);
  };

  const typeCounts = logs.reduce((acc, l) => {
    acc[l.type] = (acc[l.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="tool-layout">
      <ApiConfig cfg={cfg} onChange={handleChange} />
      <LogFilters
        cfg={cfg}
        onChange={handleChange}
        types={types}
        onToggleType={handleToggleType}
      />
      <ActionBar
        running={running}
        done={done}
        logCount={logs.length}
        onFetch={handleFetch}
        onDownload={() => downloadJSON(logs)}
      />
      {(running || done) && (
        <FetchProgress progress={progress} terminal={terminal} />
      )}
      {done && logs.length > 0 && (
        <TypeBreakdown counts={typeCounts} />
      )}
    </div>
  );
};

export default GetLogs;
