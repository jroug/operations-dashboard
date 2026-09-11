/** Displays active dashboard alerts and exposes acknowledgement actions to the page owner. */
import { Button, Chip, Paper } from "@mui/material";
import type { Alert } from "../../types";
import Icon from "../Icon";

export interface DashboardAlert extends Alert {
  workerName?: string;
}

interface AlertsPanelProps {
  alerts: DashboardAlert[];
  onAcknowledge: (alert: DashboardAlert) => void;
}

export default function AlertsPanel({ alerts, onAcknowledge }: AlertsPanelProps) {
  return (
    <Paper component="article" className="panel alerts-panel" elevation={0}>
      <div className="panel-header"><div><h2>Sample alerts</h2><p>Prioritised by severity</p></div><Chip className="alert-total" size="small" label={`${alerts.length} active`} /></div>
      <div className="alert-list">
        {alerts.map((alert) => <div className={`alert-item ${alert.severity}`} key={alert.id}>
          <div className="alert-line"><span className="severity-icon"><Icon name={alert.severity === "critical" ? "alert" : alert.severity === "high" ? "bell" : "battery"} size={17} /></span><div className="alert-copy"><div><span className={`severity-label ${alert.severity}`}>{alert.severity}</span><time>{alert.time}</time></div><strong>{alert.message}</strong><p>{alert.workerName} · {alert.type}</p></div></div>
          <Button onClick={() => onAcknowledge(alert)} startIcon={<Icon name="check" size={14} />}>Acknowledge</Button>
        </div>)}
        {alerts.length === 0 && <div className="alerts-clear"><span><Icon name="check" size={22} /></span><strong>All caught up</strong><p>No active alerts right now.</p></div>}
      </div>
      {alerts.length > 0 && <Button className="panel-footer-button" endIcon={<Icon name="chevron" size={15} />}>Open alert centre</Button>}
    </Paper>
  );
}
