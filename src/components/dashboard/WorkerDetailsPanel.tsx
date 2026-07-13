/** Summarizes PPE compliance, equipment state, biometrics, and connectivity for one worker. */
import type { CSSProperties } from "react";
import { Chip, Paper } from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";
import WorkerAvatar from "../WorkerAvatar";

export interface PpeItem {
  name: string;
  active: boolean;
}

interface WorkerDetailsPanelProps {
  worker: Worker;
  ppeItems: PpeItem[];
}

export default function WorkerDetailsPanel({ worker, ppeItems }: WorkerDetailsPanelProps) {
  return (
    <Paper component="article" className="panel worker-detail-panel" elevation={0}>
      <div className="detail-heading"><div className="selected-profile"><WorkerAvatar worker={worker} large /><span><small>Selected worker</small><h2>{worker.name}</h2><p>{worker.role} · {worker.id}</p></span></div><Chip className={`connection-pill ${worker.connected ? "online" : "offline"}`} size="small" icon={<span />} label={worker.connected ? "Connected" : "Offline"} /></div>
      <div className="detail-content">
        <div className="compliance-score"><div className="score-ring" style={{ "--score": `${worker.complianceScore * 3.6}deg` } as CSSProperties}><div><strong>{worker.complianceScore}</strong><small>/100</small></div></div><span><strong>PPE score</strong><small>{worker.compliant ? "Fully compliant" : "Needs attention"}</small></span></div>
        <div className="ppe-checks"><span className="detail-label">Equipment check</span><div>{ppeItems.map((item) => <span className={item.active ? "active" : "missing"} key={item.name}><i>{item.active ? <Icon name="check" size={13} /> : "!"}</i>{item.name}</span>)}</div></div>
        <div className="biometric-cards"><span className="detail-label">Biometrics & device</span><div><div className="mini-metric heart"><span><Icon name="heart" size={18} /></span><p><small>Heart rate</small><strong>{worker.heartRate} <em>bpm</em></strong></p></div><div className="mini-metric fatigue"><span><Icon name="activity" size={18} /></span><p><small>Fatigue</small><strong>{worker.fatigue}</strong></p></div><div className="mini-metric battery"><span><Icon name="battery" size={18} /></span><p><small>Battery</small><strong>{worker.battery}%</strong></p></div></div></div>
      </div>
    </Paper>
  );
}
