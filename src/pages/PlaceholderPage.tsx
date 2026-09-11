/** Selects and composes the appropriate static preview route from shared configuration. */
import { Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IncidentsContent from "../components/placeholders/IncidentsContent";
import PlaceholderSummaryGrid from "../components/placeholders/PlaceholderSummaryGrid";
import RecommendationsContent from "../components/placeholders/RecommendationsContent";
import AssetMonitoringContent from "../components/placeholders/AssetMonitoringContent";
import TeamPerformanceContent from "../components/placeholders/TeamPerformanceContent";
import PageHeader from "../components/PageHeader";
import { placeholderPageConfig } from "../data/placeholderPages";
import type { PlaceholderPageType } from "../types/placeholderPages";

interface PlaceholderPageProps {
  page: PlaceholderPageType;
}

export default function PlaceholderPage({ page }: PlaceholderPageProps) {
  const navigate = useNavigate();
  const config = placeholderPageConfig[page];

  return (
    <div className="placeholder-page">
      <PageHeader
        variant="placeholder"
        eyebrow={config.eyebrow}
        title={config.title}
        notificationCount={3}
        onBack={() => navigate("/")}
        actions={<><Chip className="preview-chip" label="Static preview" size="small" /><Button disabled variant="outlined">{config.action}</Button></>}
      />
      <p className="placeholder-description">{config.description}</p>
      <PlaceholderSummaryGrid cards={config.cards} />
      <section className="placeholder-content-grid">
        {page === "team-performance" && <TeamPerformanceContent />}
        {page === "incidents" && <IncidentsContent />}
        {page === "asset-monitoring" && <AssetMonitoringContent />}
        {page === "operational-insights" && <RecommendationsContent />}
      </section>
    </div>
  );
}
