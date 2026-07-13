/** Core domain models used by the dashboard's mock operational datasets. */
export interface Worker {
  id: string;
  name: string;
  role: string;
  site: string;
  zone: string;
  compliant: boolean;
  complianceScore: number;
  heartRate: number;
  fatigue: "low" | "medium" | "high";
  battery: number;
  connected: boolean;
  ppe: {
    helmet: boolean;
    vest: boolean;
    gloves: boolean;
    boots: boolean;
    glasses: boolean;
  };
}

export interface Alert {
  id: string;
  workerId: string;
  type: string;
  severity: "critical" | "high" | "low";
  message: string;
  time: string;
}

export interface Incident {
  id: string;
  workerId: string;
  date: string;
  type: string;
  severity: string;
  conditions: {
    weather: string;
    tempC: number;
    fatigue: string;
    ppeOk: boolean;
    shift: string;
  };
}

export interface Robot {
  model: string;
  battery: number;
  mode: string;
  tempC: number;
  gas: string;
  detections: {
    type: string;
    zone: string;
    time: string;
  }[];
}

export interface ComplianceTrendPoint {
  month: string;
  score: number;
}

export interface BiometricTrendPoint {
  time: string;
  heartRate: number;
  fatigue: number;
}


export type IconName =
  | "activity"
  | "alert"
  | "battery"
  | "bell"
  | "check"
  | "chevron"
  | "dashboard"
  | "filter"
  | "heart"
  | "helmet"
  | "location"
  | "moon"
  | "search"
  | "settings"
  | "shield"
  | "sun"
  | "team"
  | "user";
