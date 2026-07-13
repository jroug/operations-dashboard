import { useMemo, useState } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import AlertsBySeverityPanel from "../components/worksite-analysis/AlertsBySeverityPanel";
import ComplianceBySitePanel from "../components/worksite-analysis/ComplianceBySitePanel";
import MonthlyComplianceTrendPanel from "../components/worksite-analysis/MonthlyComplianceTrendPanel";
import RiskZoneMapPanel from "../components/worksite-analysis/RiskZoneMapPanel";
import SiteIcon from "../components/worksite-analysis/SiteIcon";
import WorksiteComparisonPanel from "../components/worksite-analysis/WorksiteComparisonPanel";
import WorksiteKpiGrid from "../components/worksite-analysis/WorksiteKpiGrid";
import type { AlertSeverityMetric, MonthlyCompliancePoint, RiskZone, SiteName, WorksiteMetric } from "../components/worksite-analysis/types";
import { alerts } from "../data/alerts";
import { workers } from "../data/workers";

const siteMetrics: WorksiteMetric[] = [
  { site: "Site A", location: "North Construction Yard", workers: 2, compliance: 81, alerts: 2, critical: 1, risk: "Elevated", color: "#397bde" },
  { site: "Site B", location: "Riverside Infrastructure", workers: 1, compliance: 95, alerts: 0, critical: 0, risk: "Low", color: "#7557c5" },
  { site: "Site C", location: "Central Logistics Hub", workers: 1, compliance: 58, alerts: 2, critical: 0, risk: "High", color: "#df725c" },
];

const monthlyTrends: MonthlyCompliancePoint[] = [
  { month: "Feb", siteA: 72, siteB: 86, siteC: 63 },
  { month: "Mar", siteA: 75, siteB: 88, siteC: 61 },
  { month: "Apr", siteA: 74, siteB: 91, siteC: 66 },
  { month: "May", siteA: 78, siteB: 90, siteC: 62 },
  { month: "Jun", siteA: 79, siteB: 93, siteC: 60 },
  { month: "Jul", siteA: 81, siteB: 95, siteC: 58 },
];

const riskZones: RiskZone[] = [
  { name: "Zone A", site: "Site A", level: "critical", incidents: 3, x: "8%", y: "12%", width: "35%", height: "34%" },
  { name: "Zone B", site: "Site B", level: "safe", incidents: 0, x: "48%", y: "12%", width: "43%", height: "34%" },
  { name: "Zone C", site: "Site A", level: "warning", incidents: 2, x: "8%", y: "53%", width: "28%", height: "34%" },
  { name: "Warehouse", site: "Site C", level: "high", incidents: 4, x: "41%", y: "53%", width: "50%", height: "34%" },
];

const severityData: AlertSeverityMetric[] = [
  { severity: "Critical", count: 1, color: "#d94a4a" },
  { severity: "High", count: 2, color: "#ce8117" },
  { severity: "Low", count: 1, color: "#397bde" },
];

export default function WorksiteAnalysisPage() {
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<SiteName>("All sites");

  const visibleSites = selectedSite === "All sites" ? siteMetrics : siteMetrics.filter((site) => site.site === selectedSite);
  const filteredWorkers = selectedSite === "All sites" ? workers : workers.filter((worker) => worker.site === selectedSite);
  const filteredWorkerIds = new Set(filteredWorkers.map((worker) => worker.id));
  const filteredAlerts = alerts.filter((alert) => filteredWorkerIds.has(alert.workerId));
  const visibleRiskZones = riskZones.filter((zone) => selectedSite === "All sites" || zone.site === selectedSite);
  const averageCompliance = Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.complianceScore, 0) / Math.max(filteredWorkers.length, 1));
  const connectedWorkerCount = filteredWorkers.filter((worker) => worker.connected).length;
  const criticalAlertCount = filteredAlerts.filter((alert) => alert.severity === "critical").length;

  const comparisonData = useMemo(() => visibleSites.map((site) => ({
    name: site.site.replace("Site ", "Site "),
    compliance: site.compliance,
    target: 90,
    color: site.color,
  })), [visibleSites]);

  return (
    <div className="worksite-page">
      <PageHeader
        variant="worksite"
        eyebrow="Analytics / Worksites"
        title="Analysis by worksite"
        notificationCount={3}
        onBack={() => navigate("/")}
        actions={<>
          <FormControl size="small" className="site-filter-select">
            <Select value={selectedSite} onChange={(event) => setSelectedSite(event.target.value as SiteName)}>
              <MenuItem value="All sites">All worksites</MenuItem>
              {siteMetrics.map((site) => <MenuItem value={site.site} key={site.site}>{site.site}</MenuItem>)}
            </Select>
          </FormControl>
          <Button className="export-button" variant="outlined" startIcon={<SiteIcon name="download" size={17} />}>Export report</Button>
        </>}
      />
      <WorksiteKpiGrid
        selectedSite={selectedSite}
        activeWorksites={visibleSites.length}
        averageCompliance={averageCompliance}
        workerCount={filteredWorkers.length}
        connectedWorkerCount={connectedWorkerCount}
        alertCount={filteredAlerts.length}
        criticalAlertCount={criticalAlertCount}
      />

      <section className="worksite-main-grid">
        <WorksiteComparisonPanel sites={visibleSites} onSiteSelect={setSelectedSite} />
        <ComplianceBySitePanel data={comparisonData} />
        <MonthlyComplianceTrendPanel selectedSite={selectedSite} data={monthlyTrends} />
        <RiskZoneMapPanel zones={visibleRiskZones} />
        <AlertsBySeverityPanel data={severityData} onOpenAlertCenter={() => navigate("/")} />
      </section>
    </div>
  );
}
