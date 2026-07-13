/** Selects and composes the appropriate static preview route from shared configuration. */
import { Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccidentsContent from "../components/placeholders/AccidentsContent";
import PlaceholderSummaryGrid from "../components/placeholders/PlaceholderSummaryGrid";
import RecommendationsContent from "../components/placeholders/RecommendationsContent";
import RobotMonitoringContent from "../components/placeholders/RobotMonitoringContent";
import RoleAnalysisContent from "../components/placeholders/RoleAnalysisContent";
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
        {page === "role-analysis" && <RoleAnalysisContent />}
        {page === "accidents" && <AccidentsContent />}
        {page === "robot-monitoring" && <RobotMonitoringContent />}
        {page === "ai-recommendations" && <RecommendationsContent />}
      </section>
    </div>
  );
}
