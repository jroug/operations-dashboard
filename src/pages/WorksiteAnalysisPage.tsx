/** Owns worksite selection and derives all site-scoped analytics for its panels. */
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
import type { SiteName } from "../components/worksite-analysis/types";
import { alerts } from "../data/alerts";
import { workers } from "../data/workers";
import { monthlyTrends, riskZones, severityData, siteMetrics } from "../data/worksiteAnalysis";

export default function WorksiteAnalysisPage() {
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<SiteName>("All sites");

  // Apply the selected site consistently across workers, alerts, zones, and summary metrics.
  const visibleSites = selectedSite === "All sites" ? siteMetrics : siteMetrics.filter((site) => site.site === selectedSite);
  const filteredWorkers = selectedSite === "All sites" ? workers : workers.filter((worker) => worker.site === selectedSite);
  const filteredWorkerIds = new Set(filteredWorkers.map((worker) => worker.id));
  const filteredAlerts = alerts.filter((alert) => filteredWorkerIds.has(alert.workerId));
  const visibleRiskZones = riskZones.filter((zone) => selectedSite === "All sites" || zone.site === selectedSite);
  const averageCompliance = Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.complianceScore, 0) / Math.max(filteredWorkers.length, 1));
  const connectedWorkerCount = filteredWorkers.filter((worker) => worker.connected).length;
  const criticalAlertCount = filteredAlerts.filter((alert) => alert.severity === "critical").length;

  // Recharts receives a compact comparison model rather than the full operational record.
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
