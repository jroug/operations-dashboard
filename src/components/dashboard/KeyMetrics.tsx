/** Presents the dashboard's workforce, completion, and alert summary metrics. */
import StatCard from "../StatCard";

interface KeyMetricsProps {
  workersOnSite: number;
  completion: number;
  activeAlerts: number;
  highPriorityAlerts: number;
  criticalAlerts: number;
}

export default function KeyMetrics({ workersOnSite, completion, activeAlerts, highPriorityAlerts, criticalAlerts }: KeyMetricsProps) {
  return (
    <section className="stats-grid" aria-label="Key metrics">
      <StatCard label="Team members" value={`${workersOnSite}`} meta="Across 3 active sites" icon="team" tone="blue" />
      <StatCard label="Task completion" value={`${completion}%`} meta="Average task completion" icon="shield" tone="green" />
      <StatCard label="Active alerts" value={`${activeAlerts}`} meta={`${highPriorityAlerts} require attention`} icon="bell" tone="amber" />
      <StatCard label="Critical events" value={`${criticalAlerts}`} meta="Immediate action needed" icon="alert" tone="red" />
    </section>
  );
}
