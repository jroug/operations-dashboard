import { useMemo, useState, type ReactNode } from "react";
import {
  Button,
  Card,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { alerts } from "../data/alerts";
import { workers } from "../data/workers";

type SiteName = "All sites" | "Site A" | "Site B" | "Site C";
type SiteIconName = "alert" | "arrow" | "bell" | "building" | "download" | "team" | "trend";

const siteIconPaths: Record<SiteIconName, ReactNode> = {
  alert: <><path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  arrow: <path d="m9 18 6-6-6-6" />,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  building: <><path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3M18 13h.01M18 17h.01M2 21h20" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M5 21h14" /></>,
  team: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  trend: <><path d="M3 3v18h18" /><path d="m7 16 4-5 4 3 5-7" /></>,
};

function SiteIcon({ name, size = 20 }: { name: SiteIconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{siteIconPaths[name]}</svg>;
}

const siteMetrics = [
  { site: "Site A", location: "North Construction Yard", workers: 2, compliance: 81, alerts: 2, critical: 1, risk: "Elevated", color: "#397bde" },
  { site: "Site B", location: "Riverside Infrastructure", workers: 1, compliance: 95, alerts: 0, critical: 0, risk: "Low", color: "#7557c5" },
  { site: "Site C", location: "Central Logistics Hub", workers: 1, compliance: 58, alerts: 2, critical: 0, risk: "High", color: "#df725c" },
];

const monthlyTrends = [
  { month: "Feb", siteA: 72, siteB: 86, siteC: 63 },
  { month: "Mar", siteA: 75, siteB: 88, siteC: 61 },
  { month: "Apr", siteA: 74, siteB: 91, siteC: 66 },
  { month: "May", siteA: 78, siteB: 90, siteC: 62 },
  { month: "Jun", siteA: 79, siteB: 93, siteC: 60 },
  { month: "Jul", siteA: 81, siteB: 95, siteC: 58 },
];

const riskZones = [
  { name: "Zone A", site: "Site A", level: "critical", incidents: 3, x: "8%", y: "12%", width: "35%", height: "34%" },
  { name: "Zone B", site: "Site B", level: "safe", incidents: 0, x: "48%", y: "12%", width: "43%", height: "34%" },
  { name: "Zone C", site: "Site A", level: "warning", incidents: 2, x: "8%", y: "53%", width: "28%", height: "34%" },
  { name: "Warehouse", site: "Site C", level: "high", incidents: 4, x: "41%", y: "53%", width: "50%", height: "34%" },
];

const severityData = [
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
  const averageCompliance = Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.complianceScore, 0) / Math.max(filteredWorkers.length, 1));

  const comparisonData = useMemo(() => visibleSites.map((site) => ({
    name: site.site.replace("Site ", "Site "),
    compliance: site.compliance,
    target: 90,
    color: site.color,
  })), [visibleSites]);

  return (
    <div className="worksite-page">
      <header className="worksite-topbar">
        <div className="worksite-title-wrap">
          <Button className="back-button" onClick={() => navigate("/")}><span className="back-chevron"><SiteIcon name="arrow" size={18} /></span></Button>
          <div><p className="eyebrow">Analytics / Worksites</p><h1>Analysis by worksite</h1></div>
        </div>
        <div className="worksite-actions">
          <FormControl size="small" className="site-filter-select">
            <Select value={selectedSite} onChange={(event) => setSelectedSite(event.target.value as SiteName)}>
              <MenuItem value="All sites">All worksites</MenuItem>
              {siteMetrics.map((site) => <MenuItem value={site.site} key={site.site}>{site.site}</MenuItem>)}
            </Select>
          </FormControl>
          <Button className="export-button" variant="outlined" startIcon={<SiteIcon name="download" size={17} />}>Export report</Button>
          <IconButton className="icon-button" aria-label="Notifications"><SiteIcon name="bell" /><span className="bell-badge">3</span></IconButton>
          <div className="mobile-profile profile-avatar">AK</div>
        </div>
      </header>

      <section className="worksite-kpi-grid">
        <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon blue"><SiteIcon name="building" /></span><div><small>Active worksites</small><strong>{visibleSites.length}</strong><p>{selectedSite === "All sites" ? "All sites reporting" : "Currently selected"}</p></div></Card>
        <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon green"><SiteIcon name="trend" /></span><div><small>Average compliance</small><strong>{averageCompliance}%</strong><p className={averageCompliance >= 80 ? "positive" : "negative"}>{averageCompliance >= 80 ? "↑ 3.6% this month" : "Below 90% target"}</p></div></Card>
        <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon violet"><SiteIcon name="team" /></span><div><small>Workers on site</small><strong>{filteredWorkers.length}</strong><p>{filteredWorkers.filter((worker) => worker.connected).length} devices connected</p></div></Card>
        <Card className="worksite-kpi" elevation={0}><span className="worksite-kpi-icon red"><SiteIcon name="alert" /></span><div><small>Active alerts</small><strong>{filteredAlerts.length}</strong><p className="negative">{filteredAlerts.filter((alert) => alert.severity === "critical").length} critical event</p></div></Card>
      </section>

      <section className="worksite-main-grid">
        <Paper className="worksite-panel site-comparison-panel" elevation={0}>
          <div className="worksite-panel-heading"><div><h2>Worksite comparison</h2><p>Live operational performance across all active sites</p></div><Chip label="Updated 2 min ago" size="small" variant="outlined" /></div>
          <div className="site-list">
            {visibleSites.map((site) => (
              <button className="site-row" key={site.site} onClick={() => setSelectedSite(site.site as SiteName)}>
                <span className="site-letter" style={{ background: `${site.color}18`, color: site.color }}>{site.site.slice(-1)}</span>
                <span className="site-name"><strong>{site.site}</strong><small>{site.location}</small></span>
                <span className="site-workers"><small>Workers</small><strong>{site.workers}</strong></span>
                <span className="site-compliance"><span><small>Compliance</small><strong>{site.compliance}%</strong></span><i><b style={{ width: `${site.compliance}%`, background: site.color }} /></i></span>
                <span className="site-alerts"><small>Alerts</small><strong className={site.alerts ? "has-alerts" : ""}>{site.alerts}</strong></span>
                <Chip size="small" className={`risk-chip ${site.risk.toLowerCase()}`} label={`${site.risk} risk`} />
                <SiteIcon name="arrow" size={16} />
              </button>
            ))}
          </div>
        </Paper>

        <Paper className="worksite-panel compliance-bars-panel" elevation={0}>
          <div className="worksite-panel-heading"><div><h2>Compliance by site</h2><p>Compared with the 90% target</p></div></div>
          <div className="worksite-chart bar-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} barCategoryGap="28%" margin={{ top: 10, right: 5, left: -22, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#75847d", fontSize: 12 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#89958f", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, "Compliance"]} cursor={{ fill: "#f5f8f6" }} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
                <Bar dataKey="compliance" radius={[6, 6, 0, 0]} maxBarSize={48}>{comparisonData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="target-note"><span /><p><strong>Target</strong> Minimum accepted compliance: 90%</p></div>
        </Paper>

        <Paper className="worksite-panel trend-panel" elevation={0}>
          <div className="worksite-panel-heading"><div><h2>Monthly compliance trend</h2><p>Six-month performance by worksite</p></div><Chip label="Last 6 months" size="small" variant="outlined" /></div>
          <div className="worksite-chart trend-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends} margin={{ top: 12, right: 14, left: -22, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#75847d", fontSize: 12 }} />
                <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "#89958f", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, "Compliance"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, color: "#718078" }} />
                {(selectedSite === "All sites" || selectedSite === "Site A") && <Line type="monotone" dataKey="siteA" name="Site A" stroke="#397bde" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />}
                {(selectedSite === "All sites" || selectedSite === "Site B") && <Line type="monotone" dataKey="siteB" name="Site B" stroke="#7557c5" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />}
                {(selectedSite === "All sites" || selectedSite === "Site C") && <Line type="monotone" dataKey="siteC" name="Site C" stroke="#df725c" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        <Paper className="worksite-panel risk-map-panel" elevation={0}>
          <div className="worksite-panel-heading"><div><h2>Risk zone map</h2><p>Incident concentration across operational zones</p></div><span className="map-live"><i />Live</span></div>
          <div className="risk-map">
            <div className="map-grid" />
            {riskZones.filter((zone) => selectedSite === "All sites" || zone.site === selectedSite).map((zone) => (
              <div className={`map-zone ${zone.level}`} style={{ left: zone.x, top: zone.y, width: zone.width, height: zone.height }} key={zone.name}>
                <span><strong>{zone.name}</strong><small>{zone.site}</small></span>
                <b>{zone.incidents}</b>
              </div>
            ))}
          </div>
          <div className="map-legend"><span className="safe" />Low <span className="warning" />Elevated <span className="high" />High <span className="critical" />Critical</div>
        </Paper>

        <Paper className="worksite-panel severity-panel" elevation={0}>
          <div className="worksite-panel-heading"><div><h2>Alerts by severity</h2><p>Current open notifications</p></div></div>
          <div className="severity-list">
            {severityData.map((item) => <div key={item.severity}><span style={{ background: item.color }} /><p><strong>{item.severity}</strong><small>{item.count} active alerts</small></p><b>{item.count}</b></div>)}
          </div>
          <Button className="severity-action" onClick={() => navigate("/")} endIcon={<SiteIcon name="arrow" size={15} />}>Open alert center</Button>
        </Paper>
      </section>
    </div>
  );
}
