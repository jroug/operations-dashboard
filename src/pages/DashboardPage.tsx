/** Composes the operational overview and owns its filtering and alert state. */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertsPanel, { type DashboardAlert } from "../components/dashboard/AlertsPanel";
import KeyMetrics from "../components/dashboard/KeyMetrics";
import WorkforceTable, { type WorkforceStatusFilter } from "../components/dashboard/WorkforceTable";
import WorkerDetailsPanel, { type ChecklistItem } from "../components/dashboard/WorkerDetailsPanel";
import PageHeader from "../components/PageHeader";
import { alerts as initialAlerts } from "../data/alerts";
import { workers } from "../data/workers";
import { useMainLayoutContext } from "../layouts/mainLayoutContext";
import type { Alert } from "../types";

const currentDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

export default function DashboardPage() {
  const navigate = useNavigate();
  const { selectedWorkerId, setSelectedWorkerId } = useMainLayoutContext();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<WorkforceStatusFilter>("all");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const selectedWorker = workers.find((worker) => worker.id === selectedWorkerId) ?? workers[0];
  // Search and completion filters are combined here so the table remains presentational.
  const visibleMembers = useMemo(() => workers.filter((worker) => {
    const matchesQuery = `${worker.name} ${worker.role} ${worker.site} ${worker.zone}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || (status === "onTrack" ? worker.onTrack : !worker.onTrack);
    return matchesQuery && matchesStatus;
  }), [query, status]);

  // Adapt the worker record into the view models consumed by the detail and alert panels.
  const checklistItems: ChecklistItem[] = Object.entries(selectedWorker.checklist).map(([name, active]) => ({ name, active }));
  const openAlerts = initialAlerts.filter((alert) => !acknowledged.includes(alert.id));
  const dashboardAlerts: DashboardAlert[] = openAlerts.map((alert) => ({
    ...alert,
    workerName: workers.find((worker) => worker.id === alert.workerId)?.name,
  }));
  // Aggregate workforce completion and remaining alert severities for the summary cards.
  const completion = Math.round(workers.reduce((sum, worker) => sum + worker.completionScore, 0) / workers.length);
  const highPriorityAlertCount = openAlerts.filter((alert) => alert.severity === "high").length;
  const criticalAlertCount = openAlerts.filter((alert) => alert.severity === "critical").length;

  const acknowledgeAlert = (alert: Alert) => setAcknowledged((current) => [...current, alert.id]);

  return <>
    <PageHeader variant="dashboard" eyebrow={currentDate} title="Operations overview" notificationCount={3} statusLabel="Demo · Sample data" />

    <KeyMetrics
      workersOnSite={workers.length}
      completion={completion}
      activeAlerts={openAlerts.length}
      highPriorityAlerts={highPriorityAlertCount}
      criticalAlerts={criticalAlertCount}
    />

    <section className="dashboard-grid">
      <WorkforceTable
        workers={visibleMembers}
        selectedWorkerId={selectedWorker.id}
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onWorkerSelect={setSelectedWorkerId}
        onViewHistory={(workerId) => navigate(`/team-activity/${workerId}`)}
      />
      <AlertsPanel alerts={dashboardAlerts} onAcknowledge={acknowledgeAlert} />
      <WorkerDetailsPanel worker={selectedWorker} checklistItems={checklistItems} />
    </section>
  </>;
}
