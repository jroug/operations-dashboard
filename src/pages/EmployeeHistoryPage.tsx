import { useNavigate, useParams } from "react-router-dom";
import BiometricsPanel from "../components/employee-history/BiometricsPanel";
import ComplianceTrendPanel from "../components/employee-history/ComplianceTrendPanel";
import EmployeeProfileCard from "../components/employee-history/EmployeeProfileCard";
import EmployeeStatsGrid from "../components/employee-history/EmployeeStatsGrid";
import IncidentHistoryPanel from "../components/employee-history/IncidentHistoryPanel";
import PPEStatusPanel from "../components/employee-history/PPEStatusPanel";
import PageHeader from "../components/PageHeader";
import { alerts as initialAlerts } from "../data/alerts";
import { incidents } from "../data/incidents";
import { workers } from "../data/workers";
import { useMainLayoutContext } from "../layouts/mainLayoutContext";

const complianceTrend = [
  { month: "Feb", score: 64 },
  { month: "Mar", score: 69 },
  { month: "Apr", score: 67 },
  { month: "May", score: 73 },
  { month: "Jun", score: 76 },
  { month: "Jul", score: 72 },
];

const biometricTrend = [
  { time: "06:00", heartRate: 72, fatigue: 18 },
  { time: "07:00", heartRate: 78, fatigue: 22 },
  { time: "08:00", heartRate: 85, fatigue: 31 },
  { time: "09:00", heartRate: 96, fatigue: 46 },
  { time: "10:00", heartRate: 89, fatigue: 52 },
  { time: "11:00", heartRate: 93, fatigue: 58 },
];

export default function EmployeeHistoryPage() {
  const navigate = useNavigate();
  const { workerId } = useParams<{ workerId: string }>();
  const { setSelectedWorkerId } = useMainLayoutContext();
  const worker = workers.find((item) => item.id === workerId) ?? workers[0];

  const workerAlerts = initialAlerts.filter((alert) => alert.workerId === worker.id);
  const workerIncidents = incidents.filter((incident) => incident.workerId === worker.id);
  const adjustedCompliance = complianceTrend.map((point, index) => ({
    ...point,
    score: Math.max(35, Math.min(100, point.score + worker.complianceScore - 72 + (index === 5 ? 0 : index % 2))),
  }));
  const adjustedBiometrics = biometricTrend.map((point, index) => ({
    ...point,
    heartRate: point.heartRate + worker.heartRate - 96,
    fatigue: Math.max(8, Math.min(95, point.fatigue + (worker.fatigue === "high" ? 24 : worker.fatigue === "low" ? -12 : 0) + index)),
  }));

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
        <ComplianceTrendPanel complianceScore={worker.complianceScore} data={adjustedCompliance} />
        <PPEStatusPanel worker={worker} />
        <BiometricsPanel data={adjustedBiometrics} />
        <IncidentHistoryPanel worker={worker} alerts={workerAlerts} incidents={workerIncidents} />
      </section>
    </div>
  );
}
