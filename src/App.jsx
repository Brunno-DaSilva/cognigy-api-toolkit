import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import GetLogs from "./components/tools/GetLogs";
import ComingSoon from "./components/ui/ComingSoon";
import "./styles/index.css";

const App = () => {
  const [activeTool, setActiveTool] = useState("logs");

  const renderContent = () => {
    switch (activeTool) {
      case "logs":      return <GetLogs />;
      case "snapshots": return <ComingSoon name="Snapshots Manager" />;
      case "analytics": return <ComingSoon name="Analytics" />;
      case "settings":  return <ComingSoon name="Settings" />;
      default:          return null;
    }
  };

  return (
    <div className="app">
      <Sidebar active={activeTool} onNavigate={setActiveTool} />
      <div className="main">
        <Topbar active={activeTool} />
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;
