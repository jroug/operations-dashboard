/** View models shared by the worksite analysis page and its chart panels. */
export type SiteName = "All sites" | "Site A" | "Site B" | "Site C";

export interface WorksiteMetric {
  site: string;
  location: string;
  workers: number;
  compliance: number;
  alerts: number;
  critical: number;
  risk: string;
  color: string;
}

export interface ComplianceComparisonPoint {
  name: string;
  compliance: number;
  target: number;
  color: string;
}

export interface MonthlyCompliancePoint {
  month: string;
  siteA: number;
  siteB: number;
  siteC: number;
}

export interface RiskZone {
  name: string;
  site: string;
  level: string;
  incidents: number;
  x: string;
  y: string;
  width: string;
  height: string;
}

export interface AlertSeverityMetric {
  severity: string;
  count: number;
  color: string;
}
