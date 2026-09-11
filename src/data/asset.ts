/** Mock telemetry and detection feed for the asset-monitoring preview. */
import type { Asset } from "../types";

export const asset: Asset = {
  model: "Field Hub A1",
  battery: 76,
  mode: "Online",
  tempC: 34,
  gas: "Normal",
  detections: [
    {
      type: "Sync interrupted",
      zone: "Zone A",
      time: "09:41",
    },
    {
      type: "Connection restored",
      zone: "Warehouse",
      time: "09:37",
    },
  ],
};
