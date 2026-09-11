/** Compares mock workforce operational performance across operational roles. */
import { Button, Paper } from "@mui/material";
import MetricBar from "./MetricBar";
import PanelHeading from "./PanelHeading";

const roles = [
  { name: "Quality Analyst", workers: 1, completion: 95, incidents: 0, violation: "None", color: "#7557c5" },
  { name: "Project Specialist", workers: 1, completion: 89, incidents: 0, violation: "Review", color: "#6366f1" },
  { name: "Operations Coordinator", workers: 1, completion: 72, incidents: 1, violation: "Handoff", color: "#ce8117" },
  { name: "Logistics Coordinator", workers: 1, completion: 58, incidents: 1, violation: "Briefing", color: "#d96357" },
];

export default function TeamPerformanceContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Role performance comparison" description="Task completion and incident frequency by job function" control="Sample period" />
      <div className="role-comparison-table">
        <div className="role-table-head"><span>Role</span><span>Members</span><span>Completion</span><span>Incidents</span><span>Most common gap</span></div>
        {roles.map((role) => <div className="role-table-row" key={role.name}><span className="role-name"><i style={{ background: role.color }}>{role.name[0]}</i><strong>{role.name}</strong></span><b>{role.workers}</b><span className="role-progress"><em><i style={{ width: `${role.completion}%`, background: role.color }} /></em><strong>{role.completion}%</strong></span><b className={role.incidents ? "danger" : "safe"}>{role.incidents}</b><span>{role.violation}</span></div>)}
      </div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Frequent checklist gaps" description="Illustrative distribution of pending checklist items" />
      <div className="horizontal-metrics"><MetricBar label="Handoff" value={38} color="#ce8117" /><MetricBar label="Review" value={31} color="#6366f1" /><MetricBar label="Briefing" value={19} color="#d96357" /><MetricBar label="Access" value={12} color="#7557c5" /></div>
      <Button disabled className="disabled-panel-action">Detailed role breakdown coming soon</Button>
    </Paper>
  </>;
}
