/** View models shared by the location analysis page and its chart panels. */
export type SiteName = "All sites" | "Site A" | "Site B" | "Site C";

export interface LocationMetric {
  site: string;
  location: string;
  workers: number;
  completion: number;
  alerts: number;
  critical: number;
  risk: string;
  color: string;
}

export interface CompletionComparisonPoint {
  name: string;
  completion: number;
  target: number;
  color: string;
}

export interface MonthlyCompletionPoint {
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
