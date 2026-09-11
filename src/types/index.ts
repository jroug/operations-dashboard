/** Core domain models used by the dashboard's mock operational datasets. */
export interface Worker {
  id: string;
  name: string;
  role: string;
  site: string;
  zone: string;
  onTrack: boolean;
  completionScore: number;
  utilization: number;
  workload: "low" | "medium" | "high";
  battery: number;
  connected: boolean;
  checklist: {
    briefing: boolean;
    access: boolean;
    handoff: boolean;
    schedule: boolean;
    review: boolean;
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
    workload: string;
    checklistOk: boolean;
    shift: string;
  };
}

export interface Asset {
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

export interface CompletionTrendPoint {
  month: string;
  score: number;
}

export interface WorkloadTrendPoint {
  time: string;
  utilization: number;
  workload: number;
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
  | "briefing"
  | "location"
  | "moon"
  | "search"
  | "settings"
  | "shield"
  | "sun"
  | "team"
  | "user";
