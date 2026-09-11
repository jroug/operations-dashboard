/** Defines the complete route tree within the shared dashboard layout. */
import { Navigate, Route, Routes } from "react-router-dom";
import { workers } from "./data/workers";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import TeamActivityPage from "./pages/TeamActivityPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import LocationAnalyticsPage from "./pages/LocationAnalyticsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Nested pages inherit the persistent sidebar and layout state from MainLayout. */}
      <Route element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        {/* A worker identifier is required, so the collection route selects the default worker. */}
        <Route path="team-activity" element={<Navigate to={`/team-activity/${workers[0].id}`} replace />} />
        <Route path="team-activity/:workerId" element={<TeamActivityPage />} />
        <Route path="team-performance" element={<PlaceholderPage page="team-performance" />} />
        <Route path="location-analytics" element={<LocationAnalyticsPage />} />
        <Route path="incidents" element={<PlaceholderPage page="incidents" />} />
        <Route path="asset-monitoring" element={<PlaceholderPage page="asset-monitoring" />} />
        <Route path="operational-insights" element={<PlaceholderPage page="operational-insights" />} />
      </Route>
      {/* Unknown URLs recover to the dashboard instead of rendering an empty state. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
