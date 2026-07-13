import { Button, Chip, Paper } from "@mui/material";
import { robot } from "../../data/robot";
import PageIcon from "./PageIcon";
import PanelHeading from "./PanelHeading";

export default function RobotMonitoringContent() {
  return <>
    <Paper className="placeholder-panel robot-feed-panel" elevation={0}>
      <PanelHeading title="Unitree live feed" description="Camera preview and AI detections from the current patrol" control="Live" />
      <div className="robot-feed-placeholder"><div className="scan-line" /><span className="robot-camera-icon"><PageIcon name="robot" size={34} /></span><strong>Live camera preview</strong><p>Unitree Go2 · Zone A patrol</p><i className="feed-label">AI VISION ACTIVE</i><i className="feed-time">09:42:18</i></div>
      <div className="robot-sensors"><div><span>34°C</span><small>Temperature</small></div><div><span className="safe-text">Normal</span><small>Gas sensor</small></div><div><span>1.2 km</span><small>Distance today</small></div><div><span>82%</span><small>Zone coverage</small></div></div>
    </Paper>
    <Paper className="placeholder-panel" elevation={0}>
      <PanelHeading title="Recent detections" description="Objects and safety issues identified today" />
      <div className="robot-detections">{robot.detections.map((detection, index) => <div key={`${detection.type}-${detection.time}`}><span className={index === 0 ? "warning" : "neutral"}><PageIcon name={index === 0 ? "alert" : "check"} size={17} /></span><p><strong>{detection.type}</strong><small>{detection.zone} · {detection.time}</small></p><Chip label={index === 0 ? "Review" : "Logged"} size="small" /></div>)}</div>
      <div className="patrol-route"><span><PageIcon name="robot" size={18} /></span><div><small>Current patrol</small><strong>Zone A → Warehouse</strong></div><em><i /></em></div>
      <Button disabled fullWidth variant="outlined">Open remote control</Button>
    </Paper>
  </>;
}
