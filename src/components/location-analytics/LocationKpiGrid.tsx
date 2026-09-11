/** Presents KPIs derived from the currently selected location scope. */
import StatCard from "../StatCard";
import SiteIcon from "./SiteIcon";
import type { SiteName } from "./types";

interface LocationKpiGridProps {
  selectedSite: SiteName;
  activeLocations: number;
  averageCompletion: number;
  workerCount: number;
  connectedWorkerCount: number;
  alertCount: number;
  criticalAlertCount: number;
}

export default function LocationKpiGrid({ selectedSite, activeLocations, averageCompletion, workerCount, connectedWorkerCount, alertCount, criticalAlertCount }: LocationKpiGridProps) {
  return (
    <section className="location-kpi-grid">
      <StatCard label="Active locations" value={activeLocations} meta={selectedSite === "All sites" ? "All sites reporting" : "Currently selected"} icon={<SiteIcon name="building" size={21} />} tone="blue" />
      <StatCard label="Average completion" value={`${averageCompletion}%`} meta={averageCompletion >= 90 ? "At or above 90% target" : "Below 90% target"} icon={<SiteIcon name="trend" size={21} />} tone="green" metaClassName={averageCompletion >= 90 ? "positive" : "negative"} />
      <StatCard label="Team members" value={workerCount} meta={`${connectedWorkerCount} devices connected`} icon={<SiteIcon name="team" size={21} />} tone="violet" />
      <StatCard label="Active alerts" value={alertCount} meta={`${criticalAlertCount} critical event`} icon={<SiteIcon name="alert" size={21} />} tone="red" metaClassName="negative" />
    </section>
  );
}
