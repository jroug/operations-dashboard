import { Chip, IconButton } from "@mui/material";
import Icon from "../Icon";

interface DashboardHeaderProps {
  notificationCount: number;
}

export default function DashboardHeader({ notificationCount }: DashboardHeaderProps) {
  return (
    <header className="topbar">
      <div><p className="eyebrow">Monday, 13 July</p><h1>Safety overview</h1></div>
      <div className="topbar-actions">
        <Chip className="live-status" icon={<span className="pulse-dot" />} label="Live monitoring" variant="outlined" />
        <IconButton className="icon-button" aria-label="Notifications"><Icon name="bell" /><span className="bell-badge">{notificationCount}</span></IconButton>
        <div className="mobile-profile profile-avatar">AK</div>
      </div>
    </header>
  );
}
