import { Card } from "@mui/material";
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
      <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon blue"><SiteIcon name="building" /></span><div><small>Active worksites</small><strong>{activeWorksites}</strong><p>{selectedSite === "All sites" ? "All sites reporting" : "Currently selected"}</p></div></Card>
      <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon green"><SiteIcon name="trend" /></span><div><small>Average compliance</small><strong>{averageCompliance}%</strong><p className={averageCompliance >= 80 ? "positive" : "negative"}>{averageCompliance >= 80 ? "↑ 3.6% this month" : "Below 90% target"}</p></div></Card>
      <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon violet"><SiteIcon name="team" /></span><div><small>Workers on site</small><strong>{workerCount}</strong><p>{connectedWorkerCount} devices connected</p></div></Card>
      <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon red"><SiteIcon name="alert" /></span><div><small>Active alerts</small><strong>{alertCount}</strong><p className="negative">{criticalAlertCount} critical event</p></div></Card>
    </section>
  );
}
