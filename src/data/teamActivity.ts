/** Worker-specific chart history used by the team activity dashboard. */
import type { WorkloadTrendPoint, CompletionTrendPoint } from "../types";

export const completionTrendsByWorker: Record<string, CompletionTrendPoint[]> = {
  "W-101": [
    { month: "Feb", score: 64 },
    { month: "Mar", score: 69 },
    { month: "Apr", score: 67 },
    { month: "May", score: 73 },
    { month: "Jun", score: 76 },
    { month: "Jul", score: 72 },
  ],
  "W-102": [
    { month: "Feb", score: 87 },
    { month: "Mar", score: 89 },
    { month: "Apr", score: 91 },
    { month: "May", score: 90 },
    { month: "Jun", score: 93 },
    { month: "Jul", score: 95 },
  ],
  "W-103": [
    { month: "Feb", score: 81 },
    { month: "Mar", score: 84 },
    { month: "Apr", score: 83 },
    { month: "May", score: 86 },
    { month: "Jun", score: 88 },
    { month: "Jul", score: 89 },
  ],
  "W-104": [
    { month: "Feb", score: 50 },
    { month: "Mar", score: 55 },
    { month: "Apr", score: 53 },
    { month: "May", score: 61 },
    { month: "Jun", score: 56 },
    { month: "Jul", score: 58 },
  ],
};

export const workloadTrendsByWorker: Record<string, WorkloadTrendPoint[]> = {
  "W-101": [
    { time: "06:00", utilization: 72, workload: 18 },
    { time: "07:00", utilization: 78, workload: 22 },
    { time: "08:00", utilization: 85, workload: 31 },
    { time: "09:00", utilization: 96, workload: 46 },
    { time: "10:00", utilization: 89, workload: 52 },
    { time: "11:00", utilization: 96, workload: 58 },
  ],
  "W-102": [
    { time: "06:00", utilization: 66, workload: 8 },
    { time: "07:00", utilization: 69, workload: 10 },
    { time: "08:00", utilization: 73, workload: 12 },
    { time: "09:00", utilization: 76, workload: 15 },
    { time: "10:00", utilization: 80, workload: 17 },
    { time: "11:00", utilization: 78, workload: 19 },
  ],
  "W-103": [
    { time: "06:00", utilization: 68, workload: 10 },
    { time: "07:00", utilization: 72, workload: 12 },
    { time: "08:00", utilization: 77, workload: 15 },
    { time: "09:00", utilization: 84, workload: 18 },
    { time: "10:00", utilization: 86, workload: 21 },
    { time: "11:00", utilization: 82, workload: 24 },
  ],
  "W-104": [
    { time: "06:00", utilization: 82, workload: 32 },
    { time: "07:00", utilization: 90, workload: 41 },
    { time: "08:00", utilization: 96, workload: 53 },
    { time: "09:00", utilization: 91, workload: 64 },
    { time: "10:00", utilization: 98, workload: 72 },
    { time: "11:00", utilization: 94, workload: 79 },
  ],
};
