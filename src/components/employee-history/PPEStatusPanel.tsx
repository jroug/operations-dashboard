import { Paper } from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";

interface PPEStatusPanelProps {
  worker: Worker;
}

export default function PPEStatusPanel({ worker }: PPEStatusPanelProps) {
  return (
    <Paper className="history-panel ppe-summary-panel" elevation={0}>
      <div className="history-panel-heading"><div><h2>Current PPE status</h2><p>Latest wearable inspection</p></div><span className={`ppe-overall ${worker.compliant ? "ok" : "attention"}`}>{worker.compliant ? "Compliant" : "Attention"}</span></div>
      <div className="history-ppe-list">
        {Object.entries(worker.ppe).map(([item, active]) => (
          <div key={item}><span className={`ppe-item-icon ${active ? "active" : "missing"}`}>{active ? <Icon name="check" size={15} /> : "!"}</span><span><strong>{item}</strong><small>{active ? "Detected and secured" : "Missing or not detected"}</small></span><b className={active ? "active" : "missing"}>{active ? "Ready" : "Missing"}</b></div>
        ))}
      </div>
      <div className="device-summary"><span><Icon name="battery" size={19} /></span><div><small>Wearable battery</small><strong>{worker.battery}%</strong></div><div className="battery-bar"><i style={{ width: `${worker.battery}%` }} /></div></div>
    </Paper>
  );
}
