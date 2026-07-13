import { useMemo, useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  createTheme,
} from "@mui/material";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";
import { alerts as initialAlerts } from "./data/alerts";
import { incidents } from "./data/incidents";
import { workers } from "./data/workers";
import WorksiteAnalysisPage from "./pages/WorksiteAnalysisPage";
import type { Alert, Worker } from "./types";

type IconName =
  | "activity"
  | "alert"
  | "battery"
  | "bell"
  | "check"
  | "chevron"
  | "dashboard"
  | "filter"
  | "heart"
  | "helmet"
  | "location"
  | "search"
  | "settings"
  | "shield"
  | "team"
  | "user";

const iconPaths: Record<IconName, ReactNode> = {
  activity: <path d="M3 12h4l2.2-6 4.1 12 2.2-6H21" />,
  alert: <><path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  battery: <><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 10v4M6 10v4h6v-4Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  helmet: <><path d="M4 14a8 8 0 0 1 16 0" /><path d="M3 14h18v3H3zM9 6v8M15 6v8" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
  team: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const initials = (name: string) => name.split(" ").map((word) => word[0]).slice(0, 2).join("");

const roleColors: Record<string, string> = {
  Electrician: "avatar-blue",
  Inspector: "avatar-violet",
  Welder: "avatar-amber",
  "Forklift Operator": "avatar-teal",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#157f59", dark: "#0e6748", light: "#eaf6f0" },
    error: { main: "#d94a4a" },
    warning: { main: "#ce8117" },
    background: { default: "#f4f7f5", paper: "#ffffff" },
    text: { primary: "#15201c", secondary: "#708078" },
    divider: "#e4e9e6",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
    h1: { fontFamily: '"Manrope", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 700 } } },
  },
});

function StatCard({ label, value, meta, icon, tone }: { label: string; value: string; meta: string; icon: IconName; tone: string }) {
  return (
    <Card className="stat-card" elevation={0}>
      <div className={`stat-icon ${tone}`}><Icon name={icon} size={21} /></div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{meta}</small>
      </div>
    </Card>
  );
}

function WorkerAvatar({ worker, large = false }: { worker: Worker; large?: boolean }) {
  return <Avatar variant="rounded" className={`worker-avatar ${roleColors[worker.role] ?? "avatar-blue"} ${large ? "large" : ""}`}>{initials(worker.name)}</Avatar>;
}

const complianceTrend = [
  { month: "Feb", score: 64 },
  { month: "Mar", score: 69 },
  { month: "Apr", score: 67 },
  { month: "May", score: 73 },
  { month: "Jun", score: 76 },
  { month: "Jul", score: 72 },
];

const biometricTrend = [
  { time: "06:00", heartRate: 72, fatigue: 18 },
  { time: "07:00", heartRate: 78, fatigue: 22 },
  { time: "08:00", heartRate: 85, fatigue: 31 },
  { time: "09:00", heartRate: 96, fatigue: 46 },
  { time: "10:00", heartRate: 89, fatigue: 52 },
  { time: "11:00", heartRate: 93, fatigue: 58 },
];

function EmployeeHistoryPage({ worker, onWorkerChange, onBack }: { worker: Worker; onWorkerChange: (id: string) => void; onBack: () => void }) {
  const workerAlerts = initialAlerts.filter((alert) => alert.workerId === worker.id);
  const workerIncidents = incidents.filter((incident) => incident.workerId === worker.id);
  const adjustedCompliance = complianceTrend.map((point, index) => ({
    ...point,
    score: Math.max(35, Math.min(100, point.score + worker.complianceScore - 72 + (index === 5 ? 0 : index % 2))),
  }));
  const adjustedBiometrics = biometricTrend.map((point, index) => ({
    ...point,
    heartRate: point.heartRate + worker.heartRate - 96,
    fatigue: Math.max(8, Math.min(95, point.fatigue + (worker.fatigue === "high" ? 24 : worker.fatigue === "low" ? -12 : 0) + index)),
  }));

  return (
    <div className="history-page">
      <header className="history-topbar">
        <div className="history-title-wrap">
          <Button className="back-button" onClick={onBack}><span className="back-chevron"><Icon name="chevron" size={18} /></span></Button>
          <div><p className="eyebrow">Workforce / Employee history</p><h1>Employee history</h1></div>
        </div>
        <div className="topbar-actions">
          <Chip className="live-status" icon={<span className="pulse-dot" />} label="Live data" variant="outlined" />
          <IconButton className="icon-button" aria-label="Notifications"><Icon name="bell" /><span className="bell-badge">3</span></IconButton>
          <div className="mobile-profile profile-avatar">AK</div>
        </div>
      </header>

      <Paper className="history-profile-card" elevation={0}>
        <div className="history-profile-main">
          <WorkerAvatar worker={worker} large />
          <div className="history-profile-copy">
            <div><h2>{worker.name}</h2><Chip size="small" className={`connection-pill ${worker.connected ? "online" : "offline"}`} icon={<span />} label={worker.connected ? "On site" : "Offline"} /></div>
            <p>{worker.role} <span>•</span> {worker.id} <span>•</span> {worker.site}</p>
            <div className="profile-location"><Icon name="location" size={15} /> Currently in <strong>{worker.zone}</strong></div>
          </div>
        </div>
        <div className="employee-picker">
          <span>View employee</span>
          <FormControl size="small">
            <Select value={worker.id} onChange={(event) => onWorkerChange(event.target.value)}>
              {workers.map((item) => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </Paper>

      <section className="history-stats-grid">
        <Card className="history-stat" elevation={0}><span className="history-stat-icon compliance"><Icon name="shield" /></span><div><small>Compliance score</small><strong>{worker.complianceScore}%</strong><p className="positive">↑ 4.2% this month</p></div></Card>
        <Card className="history-stat" elevation={0}><span className="history-stat-icon heart"><Icon name="heart" /></span><div><small>Average heart rate</small><strong>{worker.heartRate} <em>bpm</em></strong><p>Within normal range</p></div></Card>
        <Card className="history-stat" elevation={0}><span className="history-stat-icon fatigue"><Icon name="activity" /></span><div><small>Current fatigue</small><strong className="capitalize">{worker.fatigue}</strong><p>Based on wearable data</p></div></Card>
        <Card className="history-stat" elevation={0}><span className="history-stat-icon incidents"><Icon name="alert" /></span><div><small>Recorded events</small><strong>{workerAlerts.length + workerIncidents.length}</strong><p>Last 30 days</p></div></Card>
      </section>

      <section className="history-content-grid">
        <Paper className="history-panel compliance-chart-panel" elevation={0}>
          <div className="history-panel-heading"><div><h2>PPE compliance trend</h2><p>Monthly compliance score over the last 6 months</p></div><Chip label="6 months" size="small" variant="outlined" /></div>
          <div className="chart-summary"><strong>{worker.complianceScore}%</strong><span><b>+8%</b> since February</span></div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adjustedCompliance} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <defs><linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#397bde" stopOpacity={0.22} /><stop offset="100%" stopColor="#397bde" stopOpacity={0.01} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
                <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, "Compliance"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="#397bde" strokeWidth={2.5} fill="url(#complianceFill)" activeDot={{ r: 5, fill: "#397bde", stroke: "#fff", strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        <Paper className="history-panel ppe-summary-panel" elevation={0}>
          <div className="history-panel-heading"><div><h2>Current PPE status</h2><p>Latest wearable inspection</p></div><span className={`ppe-overall ${worker.compliant ? "ok" : "attention"}`}>{worker.compliant ? "Compliant" : "Attention"}</span></div>
          <div className="history-ppe-list">
            {Object.entries(worker.ppe).map(([item, active]) => (
              <div key={item}><span className={`ppe-item-icon ${active ? "active" : "missing"}`}>{active ? <Icon name="check" size={15} /> : "!"}</span><span><strong>{item}</strong><small>{active ? "Detected and secured" : "Missing or not detected"}</small></span><b className={active ? "active" : "missing"}>{active ? "Ready" : "Missing"}</b></div>
            ))}
          </div>
          <div className="device-summary"><span><Icon name="battery" size={19} /></span><div><small>Wearable battery</small><strong>{worker.battery}%</strong></div><div className="battery-bar"><i style={{ width: `${worker.battery}%` }} /></div></div>
        </Paper>

        <Paper className="history-panel biometrics-panel" elevation={0}>
          <div className="history-panel-heading"><div><h2>Biometric activity</h2><p>Heart rate and fatigue throughout today’s shift</p></div><div className="chart-legend"><span className="heart" />Heart rate <span className="fatigue" />Fatigue</div></div>
          <div className="chart-container biometrics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adjustedBiometrics} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
                <Line type="monotone" dataKey="heartRate" name="Heart rate" stroke="#df6666" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="fatigue" name="Fatigue" stroke="#ce8117" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        <Paper className="history-panel activity-panel" elevation={0}>
          <div className="history-panel-heading"><div><h2>Incident & alert history</h2><p>Safety events associated with this employee</p></div><Button className="text-button">View report</Button></div>
          <div className="history-timeline">
            {workerAlerts.map((alert) => <div className="timeline-event" key={alert.id}><span className={`timeline-marker ${alert.severity}`}><Icon name="bell" size={16} /></span><div><span><strong>{alert.message}</strong><time>Today, {alert.time}</time></span><p>{alert.type} alert recorded in {worker.zone}</p><Chip size="small" className={`timeline-chip ${alert.severity}`} label={alert.severity} /></div></div>)}
            {workerIncidents.map((incident) => <div className="timeline-event" key={incident.id}><span className="timeline-marker critical"><Icon name="alert" size={16} /></span><div><span><strong>{incident.type}</strong><time>{incident.date}</time></span><p>{incident.conditions.shift} shift · {incident.conditions.weather} · {incident.conditions.tempC}°C</p><Chip size="small" className="timeline-chip critical" label={incident.severity} /></div></div>)}
            {workerAlerts.length + workerIncidents.length === 0 && <div className="history-empty"><span><Icon name="check" size={22} /></span><strong>No recorded events</strong><p>This employee has a clean safety history.</p></div>}
          </div>
        </Paper>
      </section>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0].id);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "compliant" | "attention">("all");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const selectedWorker = workers.find((worker) => worker.id === selectedWorkerId) ?? workers[0];
  const isHistoryPage = location.pathname.startsWith("/employee-history");
  const isWorksitePage = location.pathname.startsWith("/worksite-analysis");
  const routeWorkerId = location.pathname.split("/")[2];
  const historyWorker = workers.find((worker) => worker.id === routeWorkerId) ?? selectedWorker;
  const visibleWorkers = useMemo(() => workers.filter((worker) => {
    const matchesQuery = `${worker.name} ${worker.role} ${worker.site} ${worker.zone}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || (status === "compliant" ? worker.compliant : !worker.compliant);
    return matchesQuery && matchesStatus;
  }), [query, status]);

  const ppeItems = Object.entries(selectedWorker.ppe).map(([name, active]) => ({ name, active }));
  const openAlerts = initialAlerts.filter((alert) => !acknowledged.includes(alert.id));
  const compliance = Math.round(workers.reduce((sum, worker) => sum + worker.complianceScore, 0) / workers.length);

  const acknowledgeAlert = (alert: Alert) => setAcknowledged((current) => [...current, alert.id]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box className="app-shell">
      <Box component="aside" className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Icon name="shield" size={23} /></span>
          <span className="brand-text"><strong>SafeWith</strong><b>Carmen</b></span>
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          <span className="nav-label">Workspace</span>
          <Button disableRipple className={`nav-item ${!isHistoryPage && !isWorksitePage ? "active" : ""}`} onClick={() => navigate("/")}><Icon name="dashboard" /><span>Overview</span></Button>
          <Button disableRipple className={`nav-item ${isHistoryPage ? "active" : ""}`} onClick={() => navigate(`/employee-history/${selectedWorkerId}`)}><Icon name="team" /><span>Employee history</span><span className="nav-count">{workers.length}</span></Button>
          <Button disableRipple className="nav-item"><Icon name="alert" /><span>Incidents</span><span className="notification-dot" /></Button>
          <span className="nav-label secondary">Management</span>
          <Button disableRipple className={`nav-item ${isWorksitePage ? "active" : ""}`} onClick={() => navigate("/worksite-analysis")}><Icon name="activity" /><span>Worksite analysis</span></Button>
          <Button disableRipple className="nav-item"><Icon name="helmet" /><span>PPE Compliance</span></Button>
          <Button disableRipple className="nav-item"><Icon name="settings" /><span>Settings</span></Button>
        </nav>

        <div className="system-card">
          <div className="system-card-head"><span className="pulse-dot" /><strong>All systems operational</strong></div>
          <p>Last health check 2 min ago</p>
          <div className="system-meter"><span /></div>
        </div>

        <div className="sidebar-profile">
          <span className="profile-avatar">AK</span>
          <span><strong>Alex Karras</strong><small>Safety Supervisor</small></span>
          <Icon name="chevron" size={16} />
        </div>
      </Box>

      <Box component="main" className="main-content">
        {isHistoryPage ? (
          <EmployeeHistoryPage
            worker={historyWorker}
            onBack={() => navigate("/")}
            onWorkerChange={(id) => {
              setSelectedWorkerId(id);
              navigate(`/employee-history/${id}`);
            }}
          />
        ) : isWorksitePage ? (
          <WorksiteAnalysisPage />
        ) : (
        <>
        <header className="topbar">
          <div>
            <p className="eyebrow">Monday, 13 July</p>
            <h1>Safety overview</h1>
          </div>
          <div className="topbar-actions">
            <Chip className="live-status" icon={<span className="pulse-dot" />} label="Live monitoring" variant="outlined" />
            <IconButton className="icon-button" aria-label="Notifications"><Icon name="bell" /><span className="bell-badge">3</span></IconButton>
            <div className="mobile-profile profile-avatar">AK</div>
          </div>
        </header>

        <section className="stats-grid" aria-label="Key metrics">
          <StatCard label="Workers on site" value={`${workers.length}`} meta="Across 3 active sites" icon="team" tone="blue" />
          <StatCard label="PPE compliance" value={`${compliance}%`} meta="↑ 4.2% from last week" icon="shield" tone="green" />
          <StatCard label="Active alerts" value={`${openAlerts.length}`} meta={`${openAlerts.filter((alert) => alert.severity === "high").length} require attention`} icon="bell" tone="amber" />
          <StatCard label="Critical events" value={`${openAlerts.filter((alert) => alert.severity === "critical").length}`} meta="Immediate action needed" icon="alert" tone="red" />
        </section>

        <section className="dashboard-grid">
          <Paper component="article" className="panel workforce-panel" elevation={0}>
            <div className="panel-header">
              <div><h2>Workforce status</h2><p>Live worker safety and compliance</p></div>
              <Button className="text-button" endIcon={<Icon name="chevron" size={16} />}>View all</Button>
            </div>
            <div className="table-toolbar">
              <TextField
                className="search-field"
                size="small"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search workers..."
                aria-label="Search workers"
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Icon name="search" size={18} /></InputAdornment> } }}
              />
              <ToggleButtonGroup
                className="status-filter"
                exclusive
                size="small"
                value={status}
                onChange={(_, nextStatus) => nextStatus && setStatus(nextStatus)}
                aria-label="Compliance filter"
              >
                <ToggleButton value="all"><Icon name="filter" size={15} /> All</ToggleButton>
                <ToggleButton value="compliant">Compliant</ToggleButton>
                <ToggleButton value="attention">Attention</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <TableContainer className="worker-table-wrap">
              <Table className="worker-table">
                <TableHead><TableRow><TableCell>Worker</TableCell><TableCell>Location</TableCell><TableCell>PPE status</TableCell><TableCell>Vitals</TableCell><TableCell>Device</TableCell><TableCell /></TableRow></TableHead>
                <TableBody>
                  {visibleWorkers.map((worker) => (
                    <TableRow hover key={worker.id} selected={selectedWorker.id === worker.id} className={selectedWorker.id === worker.id ? "selected" : ""} onClick={() => setSelectedWorkerId(worker.id)}>
                      <TableCell><div className="worker-identity"><WorkerAvatar worker={worker} /><span><strong>{worker.name}</strong><small>{worker.role}</small></span></div></TableCell>
                      <TableCell><div className="location-cell"><Icon name="location" size={15} /><span><strong>{worker.zone}</strong><small>{worker.site}</small></span></div></TableCell>
                      <TableCell><Chip className={`status-badge ${worker.compliant ? "ok" : "warning"}`} size="small" icon={<span>{worker.compliant ? <Icon name="check" size={13} /> : "!"}</span>} label={worker.compliant ? "Compliant" : "Action needed"} /></TableCell>
                      <TableCell><div className="vitals"><Icon name="heart" size={16} /><strong>{worker.heartRate}</strong><small>bpm</small></div></TableCell>
                      <TableCell><div className={`device-status ${worker.connected ? "online" : "offline"}`}><span /><strong>{worker.battery}%</strong></div></TableCell>
                      <TableCell><Icon name="chevron" size={16} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {visibleWorkers.length === 0 && <div className="empty-state">No workers match these filters.</div>}
            </TableContainer>
          </Paper>

          <Paper component="article" className="panel alerts-panel" elevation={0}>
            <div className="panel-header">
              <div><h2>Live alerts</h2><p>Prioritised by severity</p></div>
              <Chip className="alert-total" size="small" label={`${openAlerts.length} active`} />
            </div>
            <div className="alert-list">
              {openAlerts.map((alert) => (
                <div className={`alert-item ${alert.severity}`} key={alert.id}>
                  <div className="alert-line">
                    <span className="severity-icon"><Icon name={alert.severity === "critical" ? "alert" : alert.severity === "high" ? "bell" : "battery"} size={17} /></span>
                    <div className="alert-copy">
                      <div><span className={`severity-label ${alert.severity}`}>{alert.severity}</span><time>{alert.time}</time></div>
                      <strong>{alert.message}</strong>
                      <p>{workers.find((worker) => worker.id === alert.workerId)?.name} · {alert.type}</p>
                    </div>
                  </div>
                  <Button onClick={() => acknowledgeAlert(alert)} startIcon={<Icon name="check" size={14} />}>Acknowledge</Button>
                </div>
              ))}
              {openAlerts.length === 0 && <div className="alerts-clear"><span><Icon name="check" size={22} /></span><strong>All caught up</strong><p>No active alerts right now.</p></div>}
            </div>
            {openAlerts.length > 0 && <Button className="panel-footer-button" endIcon={<Icon name="chevron" size={15} />}>Open alert centre</Button>}
          </Paper>

          <Paper component="article" className="panel worker-detail-panel" elevation={0}>
            <div className="detail-heading">
              <div className="selected-profile"><WorkerAvatar worker={selectedWorker} large /><span><small>Selected worker</small><h2>{selectedWorker.name}</h2><p>{selectedWorker.role} · {selectedWorker.id}</p></span></div>
              <Chip className={`connection-pill ${selectedWorker.connected ? "online" : "offline"}`} size="small" icon={<span />} label={selectedWorker.connected ? "Connected" : "Offline"} />
            </div>
            <div className="detail-content">
              <div className="compliance-score">
                <div className="score-ring" style={{ "--score": `${selectedWorker.complianceScore * 3.6}deg` } as React.CSSProperties}>
                  <div><strong>{selectedWorker.complianceScore}</strong><small>/100</small></div>
                </div>
                <span><strong>PPE score</strong><small>{selectedWorker.compliant ? "Fully compliant" : "Needs attention"}</small></span>
              </div>
              <div className="ppe-checks">
                <span className="detail-label">Equipment check</span>
                <div>{ppeItems.map((item) => <span className={item.active ? "active" : "missing"} key={item.name}><i>{item.active ? <Icon name="check" size={13} /> : "!"}</i>{item.name}</span>)}</div>
              </div>
              <div className="biometric-cards">
                <span className="detail-label">Biometrics & device</span>
                <div>
                  <div className="mini-metric heart"><span><Icon name="heart" size={18} /></span><p><small>Heart rate</small><strong>{selectedWorker.heartRate} <em>bpm</em></strong></p></div>
                  <div className="mini-metric fatigue"><span><Icon name="activity" size={18} /></span><p><small>Fatigue</small><strong>{selectedWorker.fatigue}</strong></p></div>
                  <div className="mini-metric battery"><span><Icon name="battery" size={18} /></span><p><small>Battery</small><strong>{selectedWorker.battery}%</strong></p></div>
                </div>
              </div>
            </div>
          </Paper>
        </section>
        </>
        )}
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default App;
