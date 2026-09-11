/** Lists detected Checklist equipment and device battery status for the selected worker. */
import { Paper } from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";

interface ReadinessStatusPanelProps {
  worker: Worker;
}

export default function ReadinessStatusPanel({ worker }: ReadinessStatusPanelProps) {
  return (
    <Paper className="history-panel checklist-summary-panel" elevation={0}>
      <div className="history-panel-heading"><div><h2>Task readiness</h2><p>Current task checklist snapshot</p></div><span className={`checklist-overall ${worker.onTrack ? "ok" : "attention"}`}>{worker.onTrack ? "On track" : "Attention"}</span></div>
      <div className="history-checklist-list">
        {Object.entries(worker.checklist).map(([item, active]) => (
          <div key={item}><span className={`checklist-item-icon ${active ? "active" : "missing"}`}>{active ? <Icon name="check" size={15} /> : "!"}</span><span><strong>{item}</strong><small>{active ? "Completed" : "Pending completion"}</small></span><b className={active ? "active" : "missing"}>{active ? "Ready" : "Missing"}</b></div>
        ))}
      </div>
      <div className="device-summary"><span><Icon name="battery" size={19} /></span><div><small>Device battery</small><strong>{worker.battery}%</strong></div><div className="battery-bar"><i style={{ width: `${worker.battery}%` }} /></div></div>
    </Paper>
  );
}
