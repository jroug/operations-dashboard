/** Renders the static accident register and environmental condition summary. */
import { Button, Chip, Paper } from "@mui/material";
import { incidents } from "../../data/incidents";
import { workers } from "../../data/workers";
import MetricBar from "./MetricBar";
import PageIcon from "./PageIcon";
import PanelHeading from "./PanelHeading";

export default function AccidentsContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Accident register" description="Most recent recorded safety events and surrounding conditions" control="All worksites" />
      <div className="accident-register">
        {incidents.map((incident) => <div className="accident-row" key={incident.id}><span className="accident-date"><strong>{incident.date.slice(-2)}</strong><small>Jun 2026</small></span><span className="accident-main"><strong>{incident.type}</strong><small>{workers.find((worker) => worker.id === incident.workerId)?.name} · {incident.id}</small></span><Chip size="small" className={`accident-severity ${incident.severity.toLowerCase()}`} label={incident.severity} /><span className="condition-tags"><i>{incident.conditions.weather}</i><i>{incident.conditions.tempC}°C</i><i>{incident.conditions.fatigue} fatigue</i></span><Button disabled size="small">Review</Button></div>)}
      </div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Contributing conditions" description="Conditions present during recorded events" />
      <div className="condition-breakdown"><MetricBar label="Elevated fatigue" value={75} color="#d96357" /><MetricBar label="Incomplete PPE" value={50} color="#ce8117" /><MetricBar label="Adverse weather" value={50} color="#397bde" /><MetricBar label="High temperature" value={25} color="#7557c5" /></div>
      <div className="placeholder-insight"><span><PageIcon name="chart" /></span><p><strong>Pattern detected</strong>Fatigue appears in most high-severity events.</p></div>
    </Paper>
  </>;
}
