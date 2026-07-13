import { Button, Chip, IconButton } from "@mui/material";
import Icon from "../Icon";

interface EmployeeHistoryHeaderProps {
  notificationCount: number;
  onBack: () => void;
}

export default function EmployeeHistoryHeader({ notificationCount, onBack }: EmployeeHistoryHeaderProps) {
  return (
    <header className="history-topbar">
      <div className="history-title-wrap">
        <Button className="back-button" onClick={onBack}><span className="back-chevron"><Icon name="chevron" size={18} /></span></Button>
        <div><p className="eyebrow">Workforce / Employee history</p><h1>Employee history</h1></div>
      </div>
      <div className="topbar-actions">
        <Chip className="live-status" icon={<span className="pulse-dot" />} label="Live data" variant="outlined" />
        <IconButton className="icon-button" aria-label="Notifications"><Icon name="bell" /><span className="bell-badge">{notificationCount}</span></IconButton>
        <div className="mobile-profile profile-avatar">AK</div>
      </div>
    </header>
  );
}
