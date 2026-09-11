/** Presents static asset telemetry, detections, connection progress, and activity status. */
import { Button, Chip, Paper } from "@mui/material";
import { asset } from "../../data/asset";
import PageIcon from "./PageIcon";
import PanelHeading from "./PanelHeading";

export default function AssetMonitoringContent() {
  return <>
    <Paper className="placeholder-panel asset-feed-panel" elevation={0}>
      <PanelHeading title="Asset telemetry preview" description="Simulated connection status and asset events" control="Demo" />
      <div className="asset-feed-placeholder"><div className="scan-line" /><span className="asset-camera-icon"><PageIcon name="asset" size={34} /></span><strong>Asset activity preview</strong><p>Field Hub A1 · Zone A connection</p><i className="feed-label">SIMULATED FEED</i><i className="feed-time">09:42:18</i></div>
      <div className="asset-sensors"><div><span>34°C</span><small>Temperature</small></div><div><span className="safe-text">Normal</span><small>Sensor status</small></div><div><span>6.2 h</span><small>Uptime today</small></div><div><span>82%</span><small>Sync progress</small></div></div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Recent detections" description="Objects and operational issues identified today" />
      <div className="asset-detections">{asset.detections.map((detection, index) => <div key={`${detection.type}-${detection.time}`}><span className={index === 0 ? "warning" : "neutral"}><PageIcon name={index === 0 ? "alert" : "check"} size={17} /></span><p><strong>{detection.type}</strong><small>{detection.zone} · {detection.time}</small></p><Chip label={index === 0 ? "Review" : "Logged"} size="small" /></div>)}</div>
      <div className="connection-route"><span><PageIcon name="asset" size={18} /></span><div><small>Current connection</small><strong>Zone A → Warehouse</strong></div><em><i /></em></div>
      <Button disabled fullWidth variant="outlined">Open remote control</Button>
    </Paper>
  </>;
}
