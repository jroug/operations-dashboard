/** Mock analytics displayed on the location analysis dashboard. */
import type {
  AlertSeverityMetric,
  MonthlyCompletionPoint,
  RiskZone,
  LocationMetric,
} from "../components/location-analytics/types";

export const siteMetrics: LocationMetric[] = [
  { site: "Site A", location: "North Operations Office", workers: 2, completion: 81, alerts: 2, critical: 1, risk: "Elevated", color: "#6366f1" },
  { site: "Site B", location: "Riverside Studio", workers: 1, completion: 95, alerts: 0, critical: 0, risk: "Low", color: "#7557c5" },
  { site: "Site C", location: "Central Distribution Hub", workers: 1, completion: 58, alerts: 2, critical: 0, risk: "High", color: "#df725c" },
];

export const monthlyTrends: MonthlyCompletionPoint[] = [
  { month: "Feb", siteA: 72, siteB: 86, siteC: 63 },
  { month: "Mar", siteA: 75, siteB: 88, siteC: 61 },
  { month: "Apr", siteA: 74, siteB: 91, siteC: 66 },
  { month: "May", siteA: 78, siteB: 90, siteC: 62 },
  { month: "Jun", siteA: 79, siteB: 93, siteC: 60 },
  { month: "Jul", siteA: 81, siteB: 95, siteC: 58 },
];

export const riskZones: RiskZone[] = [
  { name: "Zone A", site: "Site A", level: "critical", incidents: 3, x: "8%", y: "12%", width: "35%", height: "34%" },
  { name: "Zone B", site: "Site B", level: "safe", incidents: 0, x: "48%", y: "12%", width: "43%", height: "34%" },
  { name: "Zone C", site: "Site A", level: "warning", incidents: 2, x: "8%", y: "53%", width: "28%", height: "34%" },
  { name: "Warehouse", site: "Site C", level: "high", incidents: 4, x: "41%", y: "53%", width: "50%", height: "34%" },
];

export const severityData: AlertSeverityMetric[] = [
  { severity: "Critical", count: 1, color: "#d94a4a" },
  { severity: "High", count: 2, color: "#ce8117" },
  { severity: "Low", count: 1, color: "#6366f1" },
];
