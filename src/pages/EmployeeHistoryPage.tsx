/** Builds a worker-specific history view from route state and local safety datasets. */
import { useNavigate, useParams } from "react-router-dom";
import BiometricsPanel from "../components/employee-history/BiometricsPanel";
import ComplianceTrendPanel from "../components/employee-history/ComplianceTrendPanel";
import EmployeeProfileCard from "../components/employee-history/EmployeeProfileCard";
import EmployeeStatsGrid from "../components/employee-history/EmployeeStatsGrid";
import IncidentHistoryPanel from "../components/employee-history/IncidentHistoryPanel";
import PPEStatusPanel from "../components/employee-history/PPEStatusPanel";
import PageHeader from "../components/PageHeader";
import { alerts as initialAlerts } from "../data/alerts";
import { biometricTrendsByWorker, complianceTrendsByWorker } from "../data/employeeHistory";
import { incidents } from "../data/incidents";
import { workers } from "../data/workers";
import { useMainLayoutContext } from "../layouts/mainLayoutContext";

export default function EmployeeHistoryPage() {
  const navigate = useNavigate();
  const { workerId } = useParams<{ workerId: string }>();
  const { setSelectedWorkerId } = useMainLayoutContext();
  const worker = workers.find((item) => item.id === workerId) ?? workers[0];

  const workerAlerts = initialAlerts.filter((alert) => alert.workerId === worker.id);
  const workerIncidents = incidents.filter((incident) => incident.workerId === worker.id);
  const complianceTrend = complianceTrendsByWorker[worker.id];
  const biometricTrend = biometricTrendsByWorker[worker.id];

  const handleWorkerChange = (id: string) => {
    setSelectedWorkerId(id);
    navigate(`/employee-history/${id}`);
  };

  return (
    <div className="history-page">
      <PageHeader variant="employee-history" eyebrow="Workforce / Employee history" title="Employee history" notificationCount={3} statusLabel="Live data" onBack={() => navigate("/")} />

      <EmployeeProfileCard worker={worker} workers={workers} onWorkerChange={handleWorkerChange} />
      <EmployeeStatsGrid worker={worker} recordedEventCount={workerAlerts.length + workerIncidents.length} />

      <section className="history-content-grid">
        <ComplianceTrendPanel complianceScore={worker.complianceScore} data={complianceTrend} />
        <PPEStatusPanel worker={worker} />
        <BiometricsPanel data={biometricTrend} />
        <IncidentHistoryPanel worker={worker} alerts={workerAlerts} incidents={workerIncidents} />
      </section>
    </div>
  );
}
