/** Defines the complete route tree within the shared dashboard layout. */
import { Navigate, Route, Routes } from "react-router-dom";
import { workers } from "./data/workers";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import EmployeeHistoryPage from "./pages/EmployeeHistoryPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import WorksiteAnalysisPage from "./pages/WorksiteAnalysisPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Nested pages inherit the persistent sidebar and layout state from MainLayout. */}
      <Route element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        {/* A worker identifier is required, so the collection route selects the default worker. */}
        <Route path="employee-history" element={<Navigate to={`/employee-history/${workers[0].id}`} replace />} />
        <Route path="employee-history/:workerId" element={<EmployeeHistoryPage />} />
        <Route path="role-analysis" element={<PlaceholderPage page="role-analysis" />} />
        <Route path="worksite-analysis" element={<WorksiteAnalysisPage />} />
        <Route path="accidents" element={<PlaceholderPage page="accidents" />} />
        <Route path="robot-monitoring" element={<PlaceholderPage page="robot-monitoring" />} />
        <Route path="ai-recommendations" element={<PlaceholderPage page="ai-recommendations" />} />
      </Route>
      {/* Unknown URLs recover to the dashboard instead of rendering an empty state. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
