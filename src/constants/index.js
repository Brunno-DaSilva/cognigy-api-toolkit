export const TYPE_CONFIG = {
  fatal: { color: "#7c3aed", label: "Fatal" },
  error: { color: "#ef4444", label: "Error" },
  warn:  { color: "#f59e0b", label: "Warning" },
  info:  { color: "#3b82f6", label: "Info" },
  debug: { color: "#8b5cf6", label: "Debug" },
  trace: { color: "#10b981", label: "Trace" },
};

export const NAV_ITEMS = [
  { id: "logs",      label: "Get Logs",          icon: "logs" },
  { id: "snapshots", label: "Snapshots",          icon: "snapshots" },
  { id: "analytics", label: "Analytics",          icon: "analytics" },
  { id: "settings",  label: "Settings",           icon: "settings" },
];

export const SORT_OPTIONS = [
  { value: "timestamp:desc", label: "Newest first" },
  { value: "timestamp:asc",  label: "Oldest first" },
];

export const LIMIT_OPTIONS = [
  { value: "25",  label: "25" },
  { value: "50",  label: "50" },
  { value: "100", label: "100 (max)" },
];

export const DEFAULT_CFG = {
  baseUrl:   "https://api-app-us.cognigy.ai",
  projectId: "",
  apiKey:    "",
  startDate: "",
  endDate:   "",
  filter:    "",
  flowName:  "",
  userId:    "",
  sort:      "timestamp:desc",
  limit:     "100",
};
