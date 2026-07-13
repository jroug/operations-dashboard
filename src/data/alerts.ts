/** Mock live alerts emitted by worker wearables and worksite safety systems. */
import type { Alert } from "../types";

export const alerts: Alert[] = [
  {
    id: "AL-1",
    workerId: "W-101",
    type: "Proximity",
    severity: "critical",
    message: "Entered restricted machinery zone",
    time: "09:34",
  },
  {
    id: "AL-2",
    workerId: "W-101",
    type: "PPE",
    severity: "high",
    message: "Missing protective gloves",
    time: "09:32",
  },
  {
    id: "AL-3",
    workerId: "W-104",
    type: "Fatigue",
    severity: "high",
    message: "High fatigue detected",
    time: "09:28",
  },
  {
    id: "AL-4",
    workerId: "W-103",
    type: "Battery",
    severity: "low",
    message: "Wearable battery below 25%",
    time: "09:20",
  },
];
