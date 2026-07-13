import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CssBaseline,
  IconButton,
  InputAdornment,
  Paper,
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

import { useLocation, useNavigate } from "react-router-dom";
import { alerts as initialAlerts } from "./data/alerts";

import { workers } from "./data/workers";
import WorksiteAnalysisPage from "./pages/WorksiteAnalysisPage";
import EmployeeHistoryPage from "./pages/EmployeeHistoryPage";
import type { Alert, Worker } from "./types";

import Icon from "./components/Icon";
import WorkerAvatar from "./components/WorkerAvatar";
import type { IconName } from "./types";


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
