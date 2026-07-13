import type { ReactNode } from "react";
import { Button, Card, Chip, IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { incidents } from "../data/incidents";
import { robot } from "../data/robot";
import { workers } from "../data/workers";

export type PlaceholderPageType = "role-analysis" | "accidents" | "robot-monitoring" | "ai-recommendations";
type PageIconName = "alert" | "arrow" | "battery" | "bell" | "brain" | "chart" | "check" | "robot" | "team" | "trend";

const iconPaths: Record<PageIconName, ReactNode> = {
  alert: <><path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  arrow: <path d="m9 18 6-6-6-6" />,
  battery: <><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 10v4M6 10v4h8v-4Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0 0 6 3 3 0 0 0 2 5.7A3.5 3.5 0 0 0 12 20V4a3 3 0 0 0-2.5.5Z" /><path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1 0 6 3 3 0 0 1-2 5.7A3.5 3.5 0 0 1 12 20V4a3 3 0 0 1 2.5.5ZM7 9h2M15 9h2M8 14h2M14 14h2" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  robot: <><rect x="4" y="6" width="16" height="13" rx="3" /><path d="M12 2v4M8 11h.01M16 11h.01M8 15h8M2 11h2M20 11h2" /></>,
  team: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  trend: <><path d="M3 3v18h18" /><path d="m7 16 4-5 4 3 5-7" /></>,
};

function PageIcon({ name, size = 20 }: { name: PageIconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const pageConfig = {
  "role-analysis": {
    eyebrow: "Analytics / Workforce",
    title: "Role analysis",
    description: "Compare safety performance, PPE compliance, and common violations across job roles.",
    action: "Generate role report",
    cards: [
      { label: "Active roles", value: "4", note: "Across all worksites", icon: "team", tone: "blue" },
      { label: "Average compliance", value: "79%", note: "↑ 2.8% this month", icon: "trend", tone: "green" },
      { label: "Highest performing", value: "Inspector", note: "95% compliance", icon: "check", tone: "violet" },
    ],
  },
  accidents: {
    eyebrow: "Safety / Incidents",
    title: "Accidents & conditions",
    description: "Review when accidents occurred and the environmental or biometric conditions around them.",
    action: "Export accident log",
    cards: [
      { label: "Recorded accidents", value: `${incidents.length}`, note: "Last 30 days", icon: "alert", tone: "red" },
      { label: "Critical events", value: `${incidents.filter((item) => item.severity === "Critical").length}`, note: "Requires review", icon: "bell", tone: "amber" },
      { label: "Days since last event", value: "15", note: "Site-wide average", icon: "check", tone: "green" },
    ],
  },
  "robot-monitoring": {
    eyebrow: "Operations / Robotics",
    title: "Robot monitoring",
    description: "Monitor patrol status, environmental sensors, detections, and coverage for the Unitree robot.",
    action: "Remote controls",
    cards: [
      { label: "Robot status", value: robot.mode, note: "Live patrol active", icon: "robot", tone: "green" },
      { label: "Battery level", value: `${robot.battery}%`, note: "Approx. 2h 18m left", icon: "battery", tone: "blue" },
      { label: "Detections today", value: `${robot.detections.length}`, note: "1 requires review", icon: "alert", tone: "amber" },
    ],
  },
  "ai-recommendations": {
    eyebrow: "AI / Compliance",
    title: "AI recommendations",
    description: "Review personalised PPE guidance generated from wearables, robot detections, and safety history.",
    action: "Generate recommendations",
    cards: [
      { label: "Workers analysed", value: `${workers.length}`, note: "Latest analysis complete", icon: "brain", tone: "violet" },
      { label: "Open recommendations", value: "6", note: "2 high priority", icon: "bell", tone: "amber" },
      { label: "Projected improvement", value: "+12%", note: "Based on completion", icon: "trend", tone: "green" },
    ],
  },
} satisfies Record<PlaceholderPageType, { eyebrow: string; title: string; description: string; action: string; cards: { label: string; value: string; note: string; icon: PageIconName; tone: string }[] }>;

const roles = [
  { name: "Inspector", workers: 1, compliance: 95, incidents: 0, violation: "None", color: "#7557c5" },
  { name: "Welder", workers: 1, compliance: 89, incidents: 0, violation: "Safety glasses", color: "#397bde" },
  { name: "Electrician", workers: 1, compliance: 72, incidents: 1, violation: "Protective gloves", color: "#ce8117" },
  { name: "Forklift Operator", workers: 1, compliance: 58, incidents: 1, violation: "Helmet", color: "#d96357" },
];

function RoleAnalysisContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Role performance comparison" description="PPE compliance and incident frequency by job function" control="Last 30 days" />
      <div className="role-comparison-table">
        <div className="role-table-head"><span>Role</span><span>Workers</span><span>Compliance</span><span>Incidents</span><span>Most common gap</span></div>
        {roles.map((role) => <div className="role-table-row" key={role.name}><span className="role-name"><i style={{ background: role.color }}>{role.name[0]}</i><strong>{role.name}</strong></span><b>{role.workers}</b><span className="role-progress"><em><i style={{ width: `${role.compliance}%`, background: role.color }} /></em><strong>{role.compliance}%</strong></span><b className={role.incidents ? "danger" : "safe"}>{role.incidents}</b><span>{role.violation}</span></div>)}
      </div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Frequent PPE gaps" description="Share of violations by equipment type" />
      <div className="horizontal-metrics"><MetricBar label="Protective gloves" value={38} color="#ce8117" /><MetricBar label="Safety glasses" value={31} color="#397bde" /><MetricBar label="Safety helmet" value={19} color="#d96357" /><MetricBar label="High-vis vest" value={12} color="#7557c5" /></div>
      <Button disabled className="disabled-panel-action">Detailed role breakdown coming soon</Button>
    </Paper>
  </>;
}

function AccidentsContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Accident register" description="Most recent recorded safety events and surrounding conditions" control="All worksites" />
      <div className="accident-register">
        {incidents.map((incident) => <div className="accident-row" key={incident.id}><span className="accident-date"><strong>{incident.date.slice(-2)}</strong><small>Jun 2026</small></span><span className="accident-main"><strong>{incident.type}</strong><small>{workers.find((worker) => worker.id === incident.workerId)?.name} · {incident.id}</small></span><Chip size="small" className={`accident-severity ${incident.severity.toLowerCase()}`} label={incident.severity} /><span className="condition-tags"><i>{incident.conditions.weather}</i><i>{incident.conditions.tempC}°C</i><i>{incident.conditions.fatigue} fatigue</i></span><Button disabled size="small">Review</Button></div>)}
      </div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Contributing conditions" description="Conditions present during recorded events" />
      <div className="condition-breakdown"><MetricBar label="Elevated fatigue" value={75} color="#d96357" /><MetricBar label="Incomplete PPE" value={50} color="#ce8117" /><MetricBar label="Adverse weather" value={50} color="#397bde" /><MetricBar label="High temperature" value={25} color="#7557c5" /></div>
      <div className="placeholder-insight"><span><PageIcon name="chart" /></span><p><strong>Pattern detected</strong>Fatigue appears in most high-severity events.</p></div>
    </Paper>
  </>;
}

function RobotMonitoringContent() {
  return <>
    <Paper className="placeholder-panel robot-feed-panel" elevation={0}>
      <PanelHeading title="Unitree live feed" description="Camera preview and AI detections from the current patrol" control="Live" />
      <div className="robot-feed-placeholder"><div className="scan-line" /><span className="robot-camera-icon"><PageIcon name="robot" size={34} /></span><strong>Live camera preview</strong><p>Unitree Go2 · Zone A patrol</p><i className="feed-label">AI VISION ACTIVE</i><i className="feed-time">09:42:18</i></div>
      <div className="robot-sensors"><div><span>34°C</span><small>Temperature</small></div><div><span className="safe-text">Normal</span><small>Gas sensor</small></div><div><span>1.2 km</span><small>Distance today</small></div><div><span>82%</span><small>Zone coverage</small></div></div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Recent detections" description="Objects and safety issues identified today" />
      <div className="robot-detections">{robot.detections.map((detection, index) => <div key={`${detection.type}-${detection.time}`}><span className={index === 0 ? "warning" : "neutral"}><PageIcon name={index === 0 ? "alert" : "check"} size={17} /></span><p><strong>{detection.type}</strong><small>{detection.zone} · {detection.time}</small></p><Chip label={index === 0 ? "Review" : "Logged"} size="small" /></div>)}</div>
      <div className="patrol-route"><span><PageIcon name="robot" size={18} /></span><div><small>Current patrol</small><strong>Zone A → Warehouse</strong></div><em><i /></em></div>
      <Button disabled fullWidth variant="outlined">Open remote control</Button>
    </Paper>
  </>;
}

function RecommendationsContent() {
  const recommendations = [
    { worker: workers[0], title: "Protective glove compliance", priority: "High", text: "Complete a glove-fit refresher before the next electrical maintenance shift.", training: "Electrical PPE refresher" },
    { worker: workers[3], title: "Helmet and fatigue intervention", priority: "High", text: "Schedule a fatigue review and verify helmet fit before returning to Zone C.", training: "Fatigue awareness" },
    { worker: workers[2], title: "Eye protection reminder", priority: "Medium", text: "Reinforce safety-glasses use during all active welding operations.", training: "Welding eye safety" },
  ];
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Personalised recommendations" description="Prioritised actions based on recent worker safety signals" control="AI generated" />
      <div className="recommendation-list">{recommendations.map(({ worker, title, priority, text, training }) => <div className="recommendation-card" key={worker.id}><span className="recommendation-score">{worker.complianceScore}<small>/100</small></span><div><span><strong>{worker.name}</strong><Chip className={`recommendation-priority ${priority.toLowerCase()}`} size="small" label={priority} /></span><h3>{title}</h3><p>{text}</p><small>Suggested training: <b>{training}</b></small></div><Button disabled variant="outlined">Send</Button></div>)}</div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Recommendation impact" description="Projected improvement after completion" />
      <div className="impact-score"><span><strong>+12%</strong><small>Projected compliance</small></span><div className="impact-ring"><div>88%</div></div></div>
      <div className="impact-list"><span><i className="high" />2 high-priority actions<b>33%</b></span><span><i className="medium" />3 training assignments<b>50%</b></span><span><i className="low" />1 general reminder<b>17%</b></span></div>
      <Button disabled fullWidth variant="contained">Send all recommendations</Button>
    </Paper>
  </>;
}

function PanelHeading({ title, description, control }: { title: string; description: string; control?: string }) {
  return <div className="placeholder-panel-heading"><div><h2>{title}</h2><p>{description}</p></div>{control && <Chip size="small" variant="outlined" label={control} />}</div>;
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return <div className="metric-bar"><span><strong>{label}</strong><b>{value}%</b></span><i><em style={{ width: `${value}%`, background: color }} /></i></div>;
}

export default function PlaceholderPage({ page }: { page: PlaceholderPageType }) {
  const navigate = useNavigate();
  const config = pageConfig[page];

  return <div className="placeholder-page">
    <header className="placeholder-topbar">
      <div className="placeholder-title-wrap"><Button className="back-button" onClick={() => navigate("/")}><span className="back-chevron"><PageIcon name="arrow" size={18} /></span></Button><div><p className="eyebrow">{config.eyebrow}</p><h1>{config.title}</h1></div></div>
      <div className="placeholder-actions"><Chip className="preview-chip" label="Static preview" size="small" /><Button disabled variant="outlined">{config.action}</Button><IconButton className="icon-button" aria-label="Notifications"><PageIcon name="bell" /><span className="bell-badge">3</span></IconButton><div className="mobile-profile profile-avatar">AK</div></div>
    </header>
    <p className="placeholder-description">{config.description}</p>
    <section className="placeholder-summary-grid">{config.cards.map((card) => <Card className="placeholder-summary-card" elevation={0} key={card.label}><span className={`placeholder-summary-icon ${card.tone}`}><PageIcon name={card.icon} /></span><div><small>{card.label}</small><strong>{card.value}</strong><p>{card.note}</p></div></Card>)}</section>
    <section className="placeholder-content-grid">
      {page === "role-analysis" && <RoleAnalysisContent />}
      {page === "accidents" && <AccidentsContent />}
      {page === "robot-monitoring" && <RobotMonitoringContent />}
      {page === "ai-recommendations" && <RecommendationsContent />}
    </section>
  </div>;
}
