/** Mock telemetry and detection feed for the robot-monitoring preview. */
import type { Robot } from "../types";

export const robot: Robot = {
  model: "Unitree Go2",
  battery: 76,
  mode: "Patrol",
  tempC: 34,
  gas: "Normal",
  detections: [
    {
      type: "No Helmet",
      zone: "Zone A",
      time: "09:41",
    },
    {
      type: "Obstacle",
      zone: "Warehouse",
      time: "09:37",
    },
  ],
};
