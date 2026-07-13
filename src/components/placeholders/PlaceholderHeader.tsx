import { Button, Chip, IconButton } from "@mui/material";
import type { PlaceholderPageConfig } from "../../types/placeholderPages";
import PageIcon from "./PageIcon";

interface PlaceholderHeaderProps {
  config: PlaceholderPageConfig;
  notificationCount: number;
  onBack: () => void;
}

export default function PlaceholderHeader({ config, notificationCount, onBack }: PlaceholderHeaderProps) {
  return (
    <header className="placeholder-topbar">
      <div className="placeholder-title-wrap"><Button className="back-button" onClick={onBack}><span className="back-chevron"><PageIcon name="arrow" size={18} /></span></Button><div><p className="eyebrow">{config.eyebrow}</p><h1>{config.title}</h1></div></div>
      <div className="placeholder-actions"><Chip className="preview-chip" label="Static preview" size="small" /><Button disabled variant="outlined">{config.action}</Button><IconButton className="icon-button" aria-label="Notifications"><PageIcon name="bell" /><span className="bell-badge">{notificationCount}</span></IconButton><div className="mobile-profile profile-avatar">AK</div></div>
    </header>
  );
}
