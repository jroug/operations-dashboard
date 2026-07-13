import { Button, Paper } from "@mui/material";
import SiteIcon from "./SiteIcon";
import type { AlertSeverityMetric } from "./types";

interface AlertsBySeverityPanelProps {
  data: AlertSeverityMetric[];
  onOpenAlertCenter: () => void;
}

export default function AlertsBySeverityPanel({ data, onOpenAlertCenter }: AlertsBySeverityPanelProps) {
  return (
    <Paper className="worksite-panel severity-panel" elevation={0}>
      <div className="worksite-panel-heading"><div><h2>Alerts by severity</h2><p>Current open notifications</p></div></div>
      <div className="severity-list">
        {data.map((item) => <div key={item.severity}><span style={{ background: item.color }} /><p><strong>{item.severity}</strong><small>{item.count} active alerts</small></p><b>{item.count}</b></div>)}
      </div>
      <Button className="severity-action" onClick={onOpenAlertCenter} endIcon={<SiteIcon name="arrow" size={15} />}>Open alert center</Button>
    </Paper>
  );
}
