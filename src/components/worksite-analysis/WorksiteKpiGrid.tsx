import StatCard from "../StatCard";
import SiteIcon from "./SiteIcon";
import type { SiteName } from "./types";

interface WorksiteKpiGridProps {
  selectedSite: SiteName;
  activeWorksites: number;
  averageCompliance: number;
  workerCount: number;
  connectedWorkerCount: number;
  alertCount: number;
  criticalAlertCount: number;
}

export default function WorksiteKpiGrid({ selectedSite, activeWorksites, averageCompliance, workerCount, connectedWorkerCount, alertCount, criticalAlertCount }: WorksiteKpiGridProps) {
  return (
    <section className="worksite-kpi-grid">
      <StatCard label="Active worksites" value={activeWorksites} meta={selectedSite === "All sites" ? "All sites reporting" : "Currently selected"} icon={<SiteIcon name="building" size={21} />} tone="blue" />
      <StatCard label="Average compliance" value={`${averageCompliance}%`} meta={averageCompliance >= 80 ? "↑ 3.6% this month" : "Below 90% target"} icon={<SiteIcon name="trend" size={21} />} tone="green" metaClassName={averageCompliance >= 80 ? "positive" : "negative"} />
      <StatCard label="Workers on site" value={workerCount} meta={`${connectedWorkerCount} devices connected`} icon={<SiteIcon name="team" size={21} />} tone="violet" />
      <StatCard label="Active alerts" value={alertCount} meta={`${criticalAlertCount} critical event`} icon={<SiteIcon name="alert" size={21} />} tone="red" metaClassName="negative" />
    </section>
  );
}
