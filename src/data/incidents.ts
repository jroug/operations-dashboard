/** Mock historical incidents with the operational conditions recorded at each event. */
import type { Incident } from "../types";

export const incidents: Incident[] = [
  {
    id: "INC-1",
    workerId: "W-101",
    date: "2026-06-28",
    type: "Fall",
    severity: "Critical",
    conditions: {
      weather: "Rain",
      tempC: 24,
      fatigue: "High",
      ppeOk: false,
      shift: "Morning",
    },
  },
  {
    id: "INC-2",
    workerId: "W-104",
    date: "2026-06-18",
    type: "Near Miss",
    severity: "Medium",
    conditions: {
      weather: "Sunny",
      tempC: 34,
      fatigue: "Medium",
      ppeOk: true,
      shift: "Evening",
    },
  },
];
