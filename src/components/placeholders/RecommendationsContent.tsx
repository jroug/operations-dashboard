/** Presents static AI-generated training recommendations and projected impact. */
import { Button, Chip, Paper } from "@mui/material";
import { workers } from "../../data/workers";
import PanelHeading from "./PanelHeading";

const recommendations = [
  { worker: workers[0], title: "Protective glove compliance", priority: "High", text: "Complete a glove-fit refresher before the next electrical maintenance shift.", training: "Electrical PPE refresher" },
  { worker: workers[3], title: "Helmet and fatigue intervention", priority: "High", text: "Schedule a fatigue review and verify helmet fit before returning to Zone C.", training: "Fatigue awareness" },
  { worker: workers[2], title: "Eye protection reminder", priority: "Medium", text: "Reinforce safety-glasses use during all active welding operations.", training: "Welding eye safety" },
];

export default function RecommendationsContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Personalised recommendations" description="Prioritised actions based on recent worker safety signals" control="AI generated" />
      <div className="recommendation-list">{recommendations.map(({ worker, title, priority, text, training }) => <div className="recommendation-card" key={worker.id}><span className="recommendation-score">{worker.complianceScore}<small>/100</small></span><div><span><strong>{worker.name}</strong><Chip className={`recommendation-priority ${priority.toLowerCase()}`} size="small" label={priority} /></span><h3>{title}</h3><p>{text}</p><small>Suggested training: <b>{training}</b></small></div><Button disabled variant="outlined">Send</Button></div>)}</div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Recommendation impact" description="Projected improvement after completion" />
      <div className="impact-score"><span><strong>+12%</strong><small>Projected compliance</small></span><div className="impact-ring"><div>88%</div></div></div>
      <div className="impact-list"><span><i className="high" />2 high-priority actions<b>33%</b></span><span><i className="medium" />3 training assignments<b>50%</b></span><span><i className="low" />1 general reminder<b>17%</b></span></div>
      <Button disabled fullWidth variant="contained">Send all recommendations</Button>
    </Paper>
  </>;
}
