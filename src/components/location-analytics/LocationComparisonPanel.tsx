/** Renders selectable site rows with workforce, completion, alert, and risk metrics. */
import { Chip, Paper } from "@mui/material";
import SiteIcon from "./SiteIcon";
import type { SiteName, LocationMetric } from "./types";

interface LocationComparisonPanelProps {
  sites: LocationMetric[];
  onSiteSelect: (site: SiteName) => void;
}

export default function LocationComparisonPanel({ sites, onSiteSelect }: LocationComparisonPanelProps) {
  return (
    <Paper className="location-panel site-comparison-panel" elevation={0}>
      <div className="location-panel-heading"><div><h2>Location comparison</h2><p>Sample operational performance across all active sites</p></div><Chip label="Sample snapshot" size="small" variant="outlined" /></div>
      <div className="site-list">
        {sites.map((site) => (
          <button className="site-row" key={site.site} onClick={() => onSiteSelect(site.site as SiteName)}>
            <span className="site-letter" style={{ background: `${site.color}18`, color: site.color }}>{site.site.slice(-1)}</span>
            <span className="site-name"><strong>{site.site}</strong><small>{site.location}</small></span>
            <span className="site-workers"><small>Members</small><strong>{site.workers}</strong></span>
            <span className="site-completion"><span><small>Completion</small><strong>{site.completion}%</strong></span><i><b style={{ width: `${site.completion}%`, background: site.color }} /></i></span>
            <span className="site-alerts"><small>Alerts</small><strong className={site.alerts ? "has-alerts" : ""}>{site.alerts}</strong></span>
            <Chip size="small" className={`risk-chip ${site.risk.toLowerCase()}`} label={`${site.risk} risk`} />
            <SiteIcon name="arrow" size={16} />
          </button>
        ))}
      </div>
    </Paper>
  );
}
