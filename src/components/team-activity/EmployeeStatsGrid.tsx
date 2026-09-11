/** Presents the selected worker's headline operational and workload statistics. */
import type { Worker } from "../../types";
import StatCard from "../StatCard";

interface EmployeeStatsGridProps {
  worker: Worker;
  recordedEventCount: number;
}

export default function EmployeeStatsGrid({ worker, recordedEventCount }: EmployeeStatsGridProps) {
  return (
    <section className="history-stats-grid">
      <StatCard label="Completion score" value={`${worker.completionScore}%`} meta="Completed share of assigned tasks" icon="shield" tone="blue" metaClassName="positive" />
      <StatCard label="Capacity utilization" value={<>{worker.utilization} <em>%</em></>} meta="Share of available capacity" icon="activity" tone="red" />
      <StatCard label="Workload level" value={worker.workload} meta="Based on assigned tasks" icon="activity" tone="amber" valueClassName="capitalize" />
      <StatCard label="Recorded events" value={recordedEventCount} meta="Sample period" icon="alert" tone="violet" />
    </section>
  );
}
