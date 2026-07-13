/** Worker-specific chart history used by the employee history dashboard. */
import type { BiometricTrendPoint, ComplianceTrendPoint } from "../types";

export const complianceTrendsByWorker: Record<string, ComplianceTrendPoint[]> = {
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

export const biometricTrendsByWorker: Record<string, BiometricTrendPoint[]> = {
  "W-101": [
    { time: "06:00", heartRate: 72, fatigue: 18 },
    { time: "07:00", heartRate: 78, fatigue: 22 },
    { time: "08:00", heartRate: 85, fatigue: 31 },
    { time: "09:00", heartRate: 96, fatigue: 46 },
    { time: "10:00", heartRate: 89, fatigue: 52 },
    { time: "11:00", heartRate: 96, fatigue: 58 },
  ],
  "W-102": [
    { time: "06:00", heartRate: 66, fatigue: 8 },
    { time: "07:00", heartRate: 69, fatigue: 10 },
    { time: "08:00", heartRate: 73, fatigue: 12 },
    { time: "09:00", heartRate: 76, fatigue: 15 },
    { time: "10:00", heartRate: 80, fatigue: 17 },
    { time: "11:00", heartRate: 78, fatigue: 19 },
  ],
  "W-103": [
    { time: "06:00", heartRate: 68, fatigue: 10 },
    { time: "07:00", heartRate: 72, fatigue: 12 },
    { time: "08:00", heartRate: 77, fatigue: 15 },
    { time: "09:00", heartRate: 84, fatigue: 18 },
    { time: "10:00", heartRate: 86, fatigue: 21 },
    { time: "11:00", heartRate: 82, fatigue: 24 },
  ],
  "W-104": [
    { time: "06:00", heartRate: 82, fatigue: 32 },
    { time: "07:00", heartRate: 90, fatigue: 41 },
    { time: "08:00", heartRate: 96, fatigue: 53 },
    { time: "09:00", heartRate: 101, fatigue: 64 },
    { time: "10:00", heartRate: 108, fatigue: 72 },
    { time: "11:00", heartRate: 104, fatigue: 79 },
  ],
};
