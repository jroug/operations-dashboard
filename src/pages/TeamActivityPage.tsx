/** Builds a worker-specific history view from route state and local operational datasets. */
import { useNavigate, useParams } from "react-router-dom";
import WorkloadPanel from "../components/team-activity/WorkloadPanel";
import CompletionTrendPanel from "../components/team-activity/CompletionTrendPanel";
import EmployeeProfileCard from "../components/team-activity/EmployeeProfileCard";
import EmployeeStatsGrid from "../components/team-activity/EmployeeStatsGrid";
import IncidentHistoryPanel from "../components/team-activity/IncidentHistoryPanel";
import ReadinessStatusPanel from "../components/team-activity/ReadinessStatusPanel";
import PageHeader from "../components/PageHeader";
import { alerts as initialAlerts } from "../data/alerts";
import { workloadTrendsByWorker, completionTrendsByWorker } from "../data/teamActivity";
import { incidents } from "../data/incidents";
import { workers } from "../data/workers";
import { useMainLayoutContext } from "../layouts/mainLayoutContext";

export default function TeamActivityPage() {
  const navigate = useNavigate();
  const { workerId } = useParams<{ workerId: string }>();
  const { setSelectedWorkerId } = useMainLayoutContext();
  const worker = workers.find((item) => item.id === workerId) ?? workers[0];

  const workerAlerts = initialAlerts.filter((alert) => alert.workerId === worker.id);
  const workerIncidents = incidents.filter((incident) => incident.workerId === worker.id);
  const completionTrend = completionTrendsByWorker[worker.id];
  const workloadTrend = workloadTrendsByWorker[worker.id];

  const handleWorkerChange = (id: string) => {
    setSelectedWorkerId(id);
    navigate(`/team-activity/${id}`);
  };

  return (
    <div className="history-page">
      <PageHeader variant="team-activity" eyebrow="Workforce / Team activity" title="Team activity" notificationCount={3} statusLabel="Demo · Sample data" onBack={() => navigate("/")} />

      <EmployeeProfileCard worker={worker} workers={workers} onWorkerChange={handleWorkerChange} />
      <EmployeeStatsGrid worker={worker} recordedEventCount={workerAlerts.length + workerIncidents.length} />

      <section className="history-content-grid">
        <CompletionTrendPanel completionScore={worker.completionScore} data={completionTrend} />
        <ReadinessStatusPanel worker={worker} />
        <WorkloadPanel data={workloadTrend} />
        <IncidentHistoryPanel worker={worker} alerts={workerAlerts} incidents={workerIncidents} />
      </section>
    </div>
  );
}
