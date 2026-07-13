import { alerts as initialAlerts } from "../data/alerts";
import { incidents } from "../data/incidents";
import { workers } from "../data/workers";

import type { Worker } from "../types";

import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Button, Chip, IconButton, Paper, Card, FormControl, Select, MenuItem } from "@mui/material";

import Icon from "../components/Icon";
import WorkerAvatar from "../components/WorkerAvatar";


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

export default function EmployeeHistoryPage({ worker, onWorkerChange, onBack }: { worker: Worker; onWorkerChange: (id: string) => void; onBack: () => void }) {



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