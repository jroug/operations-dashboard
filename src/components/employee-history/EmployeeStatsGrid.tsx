import { Card } from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";

interface EmployeeStatsGridProps {
  worker: Worker;
  recordedEventCount: number;
}

export default function EmployeeStatsGrid({ worker, recordedEventCount }: EmployeeStatsGridProps) {
  return (
    <section className="history-stats-grid">
      <Card className="history-stat" elevation={0}><span className="history-stat-icon compliance"><Icon name="shield" /></span><div><small>Compliance score</small><strong>{worker.complianceScore}%</strong><p className="positive">↑ 4.2% this month</p></div></Card>
      <Card className="history-stat" elevation={0}><span className="history-stat-icon heart"><Icon name="heart" /></span><div><small>Average heart rate</small><strong>{worker.heartRate} <em>bpm</em></strong><p>Within normal range</p></div></Card>
      <Card className="history-stat" elevation={0}><span className="history-stat-icon fatigue"><Icon name="activity" /></span><div><small>Current fatigue</small><strong className="capitalize">{worker.fatigue}</strong><p>Based on wearable data</p></div></Card>
      <Card className="history-stat" elevation={0}><span className="history-stat-icon incidents"><Icon name="alert" /></span><div><small>Recorded events</small><strong>{recordedEventCount}</strong><p>Last 30 days</p></div></Card>
    </section>
  );
}
