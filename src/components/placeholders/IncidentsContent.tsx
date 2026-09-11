/** Renders the static accident register and environmental condition summary. */
import { Button, Chip, Paper } from "@mui/material";
import { incidents } from "../../data/incidents";
import { workers } from "../../data/workers";
import MetricBar from "./MetricBar";
import PageIcon from "./PageIcon";
import PanelHeading from "./PanelHeading";

export default function IncidentsContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Incident register" description="Most recent recorded operational events and surrounding conditions" control="All locations" />
      <div className="accident-register">
        {incidents.map((incident) => <div className="accident-row" key={incident.id}><span className="accident-date"><strong>{incident.date.slice(-2)}</strong><small>Jun 2026</small></span><span className="accident-main"><strong>{incident.type}</strong><small>{workers.find((worker) => worker.id === incident.workerId)?.name} · {incident.id}</small></span><Chip size="small" className={`accident-severity ${incident.severity.toLowerCase()}`} label={incident.severity} /><span className="condition-tags"><i>{incident.conditions.weather}</i><i>{incident.conditions.tempC}°C</i><i>{incident.conditions.workload} workload</i></span><Button disabled size="small">Review</Button></div>)}
      </div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Contributing conditions" description="Conditions present during recorded events" />
      <div className="condition-breakdown"><MetricBar label="Elevated workload" value={100} color="#d96357" /><MetricBar label="Incomplete checklist" value={50} color="#ce8117" /><MetricBar label="Adverse weather" value={50} color="#6366f1" /><MetricBar label="High temperature" value={50} color="#7557c5" /></div>
      <div className="placeholder-insight"><span><PageIcon name="chart" /></span><p><strong>Sample observation</strong>Workload achecklistars in most high-severity events.</p></div>
    </Paper>
  </>;
}
