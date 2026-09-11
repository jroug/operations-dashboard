/** Owns location selection and derives all site-scoped analytics for its panels. */
import { useMemo, useState } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import AlertsBySeverityPanel from "../components/location-analytics/AlertsBySeverityPanel";
import CompletionBySitePanel from "../components/location-analytics/CompletionBySitePanel";
import MonthlyCompletionTrendPanel from "../components/location-analytics/MonthlyCompletionTrendPanel";
import RiskZoneMapPanel from "../components/location-analytics/RiskZoneMapPanel";
import SiteIcon from "../components/location-analytics/SiteIcon";
import LocationComparisonPanel from "../components/location-analytics/LocationComparisonPanel";
import LocationKpiGrid from "../components/location-analytics/LocationKpiGrid";
import type { SiteName } from "../components/location-analytics/types";
import { alerts } from "../data/alerts";
import { workers } from "../data/workers";
import { monthlyTrends, riskZones, severityData, siteMetrics } from "../data/locationAnalytics";

export default function LocationAnalyticsPage() {
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<SiteName>("All sites");

  // Apply the selected site consistently across workers, alerts, zones, and summary metrics.
  const visibleSites = selectedSite === "All sites" ? siteMetrics : siteMetrics.filter((site) => site.site === selectedSite);
  const filteredMembers = selectedSite === "All sites" ? workers : workers.filter((worker) => worker.site === selectedSite);
  const filteredWorkerIds = new Set(filteredMembers.map((worker) => worker.id));
  const filteredAlerts = alerts.filter((alert) => filteredWorkerIds.has(alert.workerId));
  const visibleRiskZones = riskZones.filter((zone) => selectedSite === "All sites" || zone.site === selectedSite);
  const averageCompletion = Math.round(filteredMembers.reduce((sum, worker) => sum + worker.completionScore, 0) / Math.max(filteredMembers.length, 1));
  const connectedWorkerCount = filteredMembers.filter((worker) => worker.connected).length;
  const criticalAlertCount = filteredAlerts.filter((alert) => alert.severity === "critical").length;

  // Recharts receives a compact comparison model rather than the full operational record.
  const comparisonData = useMemo(() => visibleSites.map((site) => ({
    name: site.site.replace("Site ", "Site "),
    completion: site.completion,
    target: 90,
    color: site.color,
  })), [visibleSites]);

  return (
    <div className="location-page">
      <PageHeader
        variant="location"
        eyebrow="Analytics / Locations"
        title="Location analytics"
        notificationCount={3}
        onBack={() => navigate("/")}
        actions={<>
          <FormControl size="small" className="site-filter-select">
            <Select value={selectedSite} onChange={(event) => setSelectedSite(event.target.value as SiteName)}>
              <MenuItem value="All sites">All locations</MenuItem>
              {siteMetrics.map((site) => <MenuItem value={site.site} key={site.site}>{site.site}</MenuItem>)}
            </Select>
          </FormControl>
          <Button className="export-button" variant="outlined" startIcon={<SiteIcon name="download" size={17} />}>Export report</Button>
        </>}
      />
      <LocationKpiGrid
        selectedSite={selectedSite}
        activeLocations={visibleSites.length}
        averageCompletion={averageCompletion}
        workerCount={filteredMembers.length}
        connectedWorkerCount={connectedWorkerCount}
        alertCount={filteredAlerts.length}
        criticalAlertCount={criticalAlertCount}
      />

      <section className="location-main-grid">
        <LocationComparisonPanel sites={visibleSites} onSiteSelect={setSelectedSite} />
        <CompletionBySitePanel data={comparisonData} />
        <MonthlyCompletionTrendPanel selectedSite={selectedSite} data={monthlyTrends} />
        <RiskZoneMapPanel zones={visibleRiskZones} />
        <AlertsBySeverityPanel data={severityData.map((item) => ({ ...item, count: filteredAlerts.filter((alert) => alert.severity === item.severity.toLowerCase()).length }))} onOpenAlertCenter={() => navigate("/")} />
      </section>
    </div>
  );
}
