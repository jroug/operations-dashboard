/** Summarizes task completion, equipment state, workload, and connectivity for one worker. */
import type { CSSProperties } from "react";
import { Chip, Paper } from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";
import WorkerAvatar from "../WorkerAvatar";

export interface ChecklistItem {
  name: string;
  active: boolean;
}

interface WorkerDetailsPanelProps {
  worker: Worker;
  checklistItems: ChecklistItem[];
}

export default function WorkerDetailsPanel({ worker, checklistItems }: WorkerDetailsPanelProps) {
  return (
    <Paper component="article" className="panel worker-detail-panel" elevation={0}>
      <div className="detail-heading"><div className="selected-profile"><WorkerAvatar worker={worker} large /><span><small>Selected member</small><h2>{worker.name}</h2><p>{worker.role} · {worker.id}</p></span></div><Chip className={`connection-pill ${worker.connected ? "online" : "offline"}`} size="small" icon={<span />} label={worker.connected ? "Connected" : "Offline"} /></div>
      <div className="detail-content">
        <div className="completion-score"><div className="score-ring" style={{ "--score": `${worker.completionScore * 3.6}deg` } as CSSProperties}><div><strong>{worker.completionScore}</strong><small>/100</small></div></div><span><strong>Completion score</strong><small>{worker.onTrack ? "On track" : "Needs attention"}</small></span></div>
        <div className="checklist-checks"><span className="detail-label">Task checklist</span><div>{checklistItems.map((item) => <span className={item.active ? "active" : "missing"} key={item.name}><i>{item.active ? <Icon name="check" size={13} /> : "!"}</i>{item.name}</span>)}</div></div>
        <div className="workload-cards"><span className="detail-label">Workload & availability</span><div><div className="mini-metric heart"><span><Icon name="activity" size={18} /></span><p><small>Utilization</small><strong>{worker.utilization} <em>%</em></strong></p></div><div className="mini-metric workload"><span><Icon name="activity" size={18} /></span><p><small>Workload</small><strong>{worker.workload}</strong></p></div><div className="mini-metric battery"><span><Icon name="battery" size={18} /></span><p><small>Battery</small><strong>{worker.battery}%</strong></p></div></div></div>
      </div>
    </Paper>
  );
}
