import { useMemo, useState } from "react";
import AlertsPanel, { type DashboardAlert } from "../components/dashboard/AlertsPanel";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import KeyMetrics from "../components/dashboard/KeyMetrics";
import WorkforceTable, { type WorkforceStatusFilter } from "../components/dashboard/WorkforceTable";
import WorkerDetailsPanel, { type PpeItem } from "../components/dashboard/WorkerDetailsPanel";
import { alerts as initialAlerts } from "../data/alerts";
import { workers } from "../data/workers";
import { useMainLayoutContext } from "../layouts/mainLayoutContext";
import type { Alert } from "../types";

export default function DashboardPage() {
  const { selectedWorkerId, setSelectedWorkerId } = useMainLayoutContext();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<WorkforceStatusFilter>("all");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const selectedWorker = workers.find((worker) => worker.id === selectedWorkerId) ?? workers[0];
  const visibleWorkers = useMemo(() => workers.filter((worker) => {
    const matchesQuery = `${worker.name} ${worker.role} ${worker.site} ${worker.zone}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || (status === "compliant" ? worker.compliant : !worker.compliant);
    return matchesQuery && matchesStatus;
  }), [query, status]);

  const ppeItems: PpeItem[] = Object.entries(selectedWorker.ppe).map(([name, active]) => ({ name, active }));
  const openAlerts = initialAlerts.filter((alert) => !acknowledged.includes(alert.id));
  const dashboardAlerts: DashboardAlert[] = openAlerts.map((alert) => ({
    ...alert,
    workerName: workers.find((worker) => worker.id === alert.workerId)?.name,
  }));
  const compliance = Math.round(workers.reduce((sum, worker) => sum + worker.complianceScore, 0) / workers.length);
  const highPriorityAlertCount = openAlerts.filter((alert) => alert.severity === "high").length;
  const criticalAlertCount = openAlerts.filter((alert) => alert.severity === "critical").length;

  const acknowledgeAlert = (alert: Alert) => setAcknowledged((current) => [...current, alert.id]);

  return <>
    <DashboardHeader notificationCount={3} />

    <KeyMetrics
      workersOnSite={workers.length}
      compliance={compliance}
      activeAlerts={openAlerts.length}
      highPriorityAlerts={highPriorityAlertCount}
      criticalAlerts={criticalAlertCount}
    />

    <section className="dashboard-grid">
      <WorkforceTable
        workers={visibleWorkers}
        selectedWorkerId={selectedWorker.id}
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onWorkerSelect={setSelectedWorkerId}
      />
      <AlertsPanel alerts={dashboardAlerts} onAcknowledge={acknowledgeAlert} />
      <WorkerDetailsPanel worker={selectedWorker} ppeItems={ppeItems} />
    </section>
  </>;
}
