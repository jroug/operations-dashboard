import { Chip, Paper } from "@mui/material";
import SiteIcon from "./SiteIcon";
import type { SiteName, WorksiteMetric } from "./types";

interface WorksiteComparisonPanelProps {
  sites: WorksiteMetric[];
  onSiteSelect: (site: SiteName) => void;
}

export default function WorksiteComparisonPanel({ sites, onSiteSelect }: WorksiteComparisonPanelProps) {
  return (
    <Paper className="worksite-panel site-comparison-panel" elevation={0}>
      <div className="worksite-panel-heading"><div><h2>Worksite comparison</h2><p>Live operational performance across all active sites</p></div><Chip label="Updated 2 min ago" size="small" variant="outlined" /></div>
      <div className="site-list">
        {sites.map((site) => (
          <button className="site-row" key={site.site} onClick={() => onSiteSelect(site.site as SiteName)}>
            <span className="site-letter" style={{ background: `${site.color}18`, color: site.color }}>{site.site.slice(-1)}</span>
            <span className="site-name"><strong>{site.site}</strong><small>{site.location}</small></span>
            <span className="site-workers"><small>Workers</small><strong>{site.workers}</strong></span>
            <span className="site-compliance"><span><small>Compliance</small><strong>{site.compliance}%</strong></span><i><b style={{ width: `${site.compliance}%`, background: site.color }} /></i></span>
            <span className="site-alerts"><small>Alerts</small><strong className={site.alerts ? "has-alerts" : ""}>{site.alerts}</strong></span>
            <Chip size="small" className={`risk-chip ${site.risk.toLowerCase()}`} label={`${site.risk} risk`} />
            <SiteIcon name="arrow" size={16} />
          </button>
        ))}
      </div>
    </Paper>
  );
}
