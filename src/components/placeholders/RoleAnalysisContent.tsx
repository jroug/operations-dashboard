import { Button, Paper } from "@mui/material";
import MetricBar from "./MetricBar";
import PanelHeading from "./PanelHeading";

const roles = [
  { name: "Inspector", workers: 1, compliance: 95, incidents: 0, violation: "None", color: "#7557c5" },
  { name: "Welder", workers: 1, compliance: 89, incidents: 0, violation: "Safety glasses", color: "#397bde" },
  { name: "Electrician", workers: 1, compliance: 72, incidents: 1, violation: "Protective gloves", color: "#ce8117" },
  { name: "Forklift Operator", workers: 1, compliance: 58, incidents: 1, violation: "Helmet", color: "#d96357" },
];

export default function RoleAnalysisContent() {
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
