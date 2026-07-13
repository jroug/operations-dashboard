import { useNavigate } from "react-router-dom";
import AccidentsContent from "../components/placeholders/AccidentsContent";
import PlaceholderHeader from "../components/placeholders/PlaceholderHeader";
import PlaceholderSummaryGrid from "../components/placeholders/PlaceholderSummaryGrid";
import RecommendationsContent from "../components/placeholders/RecommendationsContent";
import RobotMonitoringContent from "../components/placeholders/RobotMonitoringContent";
import RoleAnalysisContent from "../components/placeholders/RoleAnalysisContent";
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
      <PlaceholderHeader config={config} notificationCount={3} onBack={() => navigate("/")} />
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
