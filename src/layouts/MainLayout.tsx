/** Owns persistent navigation state and frames every routed dashboard page. */
import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Outlet } from "react-router-dom";
import { workers } from "../data/workers";
import type { MainLayoutContext } from "./mainLayoutContext";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <Box className="app-shell">
      <IconButton
        className={`mobile-menu-button${mobileSidebarOpen ? " open" : ""}`}
        onClick={() => setMobileSidebarOpen((open) => !open)}
        aria-label={mobileSidebarOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileSidebarOpen}
      >
        <span className="mobile-menu-glyph"><span /><span /><span /></span>
      </IconButton>
      {mobileSidebarOpen && <button type="button" className="mobile-sidebar-backdrop" aria-label="Close navigation" onClick={() => setMobileSidebarOpen(false)} />}
      <Sidebar
        selectedWorkerId={selectedWorkerId}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        onNavigate={() => setMobileSidebarOpen(false)}
      />
      <Box component="main" className={`main-content${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
        {/* Child routes share worker selection without introducing application-wide state. */}
        <Outlet context={{ selectedWorkerId, setSelectedWorkerId } satisfies MainLayoutContext} />
      </Box>
    </Box>
  );

}
