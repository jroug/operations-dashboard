import { Button, FormControl, IconButton, MenuItem, Select } from "@mui/material";
import SiteIcon from "./SiteIcon";
import type { SiteName } from "./types";

interface WorksiteHeaderProps {
  selectedSite: SiteName;
  sites: string[];
  notificationCount: number;
  onSiteChange: (site: SiteName) => void;
  onBack: () => void;
}

export default function WorksiteHeader({ selectedSite, sites, notificationCount, onSiteChange, onBack }: WorksiteHeaderProps) {
  return (
    <header className="worksite-topbar">
      <div className="worksite-title-wrap">
        <Button className="back-button" onClick={onBack}><span className="back-chevron"><SiteIcon name="arrow" size={18} /></span></Button>
        <div><p className="eyebrow">Analytics / Worksites</p><h1>Analysis by worksite</h1></div>
      </div>
      <div className="worksite-actions">
        <FormControl size="small" className="site-filter-select">
          <Select value={selectedSite} onChange={(event) => onSiteChange(event.target.value as SiteName)}>
            <MenuItem value="All sites">All worksites</MenuItem>
            {sites.map((site) => <MenuItem value={site} key={site}>{site}</MenuItem>)}
          </Select>
        </FormControl>
        <Button className="export-button" variant="outlined" startIcon={<SiteIcon name="download" size={17} />}>Export report</Button>
        <IconButton className="icon-button" aria-label="Notifications"><SiteIcon name="bell" /><span className="bell-badge">{notificationCount}</span></IconButton>
        <div className="mobile-profile profile-avatar">AK</div>
      </div>
    </header>
  );
}
