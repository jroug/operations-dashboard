import { Paper } from "@mui/material";
import type { RiskZone } from "./types";

interface RiskZoneMapPanelProps {
  zones: RiskZone[];
}

export default function RiskZoneMapPanel({ zones }: RiskZoneMapPanelProps) {
  return (
    <Paper className="worksite-panel risk-map-panel" elevation={0}>
      <div className="worksite-panel-heading"><div><h2>Risk zone map</h2><p>Incident concentration across operational zones</p></div><span className="map-live"><i />Live</span></div>
      <div className="risk-map">
        <div className="map-grid" />
        {zones.map((zone) => (
          <div className={`map-zone ${zone.level}`} style={{ left: zone.x, top: zone.y, width: zone.width, height: zone.height }} key={zone.name}>
            <span><strong>{zone.name}</strong><small>{zone.site}</small></span>
            <b>{zone.incidents}</b>
          </div>
        ))}
      </div>
      <div className="map-legend"><span className="safe" />Low <span className="warning" />Elevated <span className="high" />High <span className="critical" />Critical</div>
    </Paper>
  );
}
