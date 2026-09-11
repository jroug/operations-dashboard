/** Presents static Sample training recommendations and projected impact. */
import { Button, Chip, Paper } from "@mui/material";
import { workers } from "../../data/workers";
import PanelHeading from "./PanelHeading";

const recommendations = [
  { worker: workers[0], title: "Complete the pending handoff", priority: "High", text: "Review the pending handoff and assign an owner before the next delivery window.", training: "Handoff checklist" },
  { worker: workers[3], title: "Rebalance the delivery queue", priority: "High", text: "Redistribute pending deliveries and confirm ownership with the logistics team.", training: "Capacity planning" },
  { worker: workers[2], title: "Finish the project review", priority: "Medium", text: "Complete the project review before moving the next milestone into delivery.", training: "Review workflow" },
];

export default function RecommendationsContent() {
  return <>
    <Paper className="placeholder-panel wide" elevation={0}>
      <PanelHeading title="Personalised recommendations" description="Example actions based on task readiness and workload" control="Sample suggestions" />
      <div className="recommendation-list">{recommendations.map(({ worker, title, priority, text, training }) => <div className="recommendation-card" key={worker.id}><span className="recommendation-score">{worker.completionScore}<small>/100</small></span><div><span><strong>{worker.name}</strong><Chip className={`recommendation-priority ${priority.toLowerCase()}`} size="small" label={priority} /></span><h3>{title}</h3><p>{text}</p><small>Suggested training: <b>{training}</b></small></div><Button disabled variant="outlined">Send</Button></div>)}</div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Recommendation impact" description="Illustrative planning scenario" />
      <div className="impact-score"><span><strong>+12%</strong><small>Potential completion</small></span><div className="impact-ring"><div>91%</div></div></div>
      <div className="impact-list"><span><i className="high" />2 high-priority actions<b>67%</b></span><span><i className="medium" />1 review action<b>33%</b></span></div>
      <Button disabled fullWidth variant="contained">Send all recommendations</Button>
    </Paper>
  </>;
}
