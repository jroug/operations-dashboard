import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { workers } from "../data/workers";
import type { MainLayoutContext } from "./mainLayoutContext";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0].id);

  return (
    <Box className="app-shell">
      <Sidebar selectedWorkerId={selectedWorkerId} />
      <Box component="main" className="main-content">
        <Outlet context={{ selectedWorkerId, setSelectedWorkerId } satisfies MainLayoutContext} />
      </Box>
    </Box>
  );

}
