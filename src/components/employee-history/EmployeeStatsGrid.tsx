import type { Worker } from "../../types";
import StatCard from "../StatCard";

interface EmployeeStatsGridProps {
  worker: Worker;
  recordedEventCount: number;
}

export default function EmployeeStatsGrid({ worker, recordedEventCount }: EmployeeStatsGridProps) {
  return (
    <section className="history-stats-grid">
      <StatCard label="Compliance score" value={`${worker.complianceScore}%`} meta="↑ 4.2% this month" icon="shield" tone="blue" metaClassName="positive" />
      <StatCard label="Average heart rate" value={<>{worker.heartRate} <em>bpm</em></>} meta="Within normal range" icon="heart" tone="red" />
      <StatCard label="Current fatigue" value={worker.fatigue} meta="Based on wearable data" icon="activity" tone="amber" valueClassName="capitalize" />
      <StatCard label="Recorded events" value={recordedEventCount} meta="Last 30 days" icon="alert" tone="violet" />
    </section>
  );
}
