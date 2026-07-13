/** Combines current alerts and historical incidents into a worker activity timeline. */
import { Button, Chip, Paper } from "@mui/material";
import type { Alert, Incident, Worker } from "../../types";
import Icon from "../Icon";

interface IncidentHistoryPanelProps {
  worker: Worker;
  alerts: Alert[];
  incidents: Incident[];
}

export default function IncidentHistoryPanel({ worker, alerts, incidents }: IncidentHistoryPanelProps) {
  return (
    <Paper className="history-panel activity-panel" elevation={0}>
      <div className="history-panel-heading"><div><h2>Incident & alert history</h2><p>Safety events associated with this employee</p></div><Button className="text-button">View report</Button></div>
      <div className="history-timeline">
        {alerts.map((alert) => <div className="timeline-event" key={alert.id}><span className={`timeline-marker ${alert.severity}`}><Icon name="bell" size={16} /></span><div><span><strong>{alert.message}</strong><time>Today, {alert.time}</time></span><p>{alert.type} alert recorded in {worker.zone}</p><Chip size="small" className={`timeline-chip ${alert.severity}`} label={alert.severity} /></div></div>)}
        {incidents.map((incident) => <div className="timeline-event" key={incident.id}><span className="timeline-marker critical"><Icon name="alert" size={16} /></span><div><span><strong>{incident.type}</strong><time>{incident.date}</time></span><p>{incident.conditions.shift} shift · {incident.conditions.weather} · {incident.conditions.tempC}°C</p><Chip size="small" className="timeline-chip critical" label={incident.severity} /></div></div>)}
        {alerts.length + incidents.length === 0 && <div className="history-empty"><span><Icon name="check" size={22} /></span><strong>No recorded events</strong><p>This employee has a clean safety history.</p></div>}
      </div>
    </Paper>
  );
}
