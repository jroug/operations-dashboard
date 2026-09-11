/** Mock live alerts emitted by worker devices and location operational systems. */
import type { Alert } from "../types";

export const alerts: Alert[] = [
  {
    id: "AL-1",
    workerId: "W-101",
    type: "Service outage",
    severity: "critical",
    message: "Location A synchronization unavailable",
    time: "09:34",
  },
  {
    id: "AL-2",
    workerId: "W-101",
    type: "Checklist",
    severity: "high",
    message: "Task handoff awaiting approval",
    time: "09:32",
  },
  {
    id: "AL-3",
    workerId: "W-104",
    type: "Workload",
    severity: "high",
    message: "Assigned queue exceeds planned capacity",
    time: "09:28",
  },
  {
    id: "AL-4",
    workerId: "W-104",
    type: "Battery",
    severity: "low",
    message: "Device battery below 25%",
    time: "09:20",
  },
];
