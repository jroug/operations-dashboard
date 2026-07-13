import type { ReactNode } from "react";
import { Button, Chip, IconButton } from "@mui/material";
import Icon from "./Icon";

export type PageHeaderVariant = "dashboard" | "employee-history" | "worksite" | "placeholder";

export interface PageHeaderProps {
  variant: PageHeaderVariant;
  eyebrow: string;
  title: string;
  notificationCount: number;
  onBack?: () => void;
  statusLabel?: string;
  actions?: ReactNode;
}

const variantClasses: Record<PageHeaderVariant, { header: string; title?: string; actions: string }> = {
  dashboard: { header: "topbar", actions: "topbar-actions" },
  "employee-history": { header: "history-topbar", title: "history-title-wrap", actions: "topbar-actions" },
  worksite: { header: "worksite-topbar", title: "worksite-title-wrap", actions: "worksite-actions" },
  placeholder: { header: "placeholder-topbar", title: "placeholder-title-wrap", actions: "placeholder-actions" },
};

export default function PageHeader({ variant, eyebrow, title, notificationCount, onBack, statusLabel, actions }: PageHeaderProps) {
  const classes = variantClasses[variant];
  const heading = <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>;

  return (
    <header className={classes.header}>
      {classes.title ? (
        <div className={classes.title}>
          {onBack && <Button className="back-button" onClick={onBack} aria-label="Back"><span className="back-chevron"><Icon name="chevron" size={18} /></span></Button>}
          {heading}
        </div>
      ) : heading}
      <div className={classes.actions}>
        {statusLabel && <Chip className="live-status" icon={<span className="pulse-dot" />} label={statusLabel} variant="outlined" />}
        {actions}
        <IconButton className="icon-button" aria-label="Notifications"><Icon name="bell" /><span className="bell-badge">{notificationCount}</span></IconButton>
        <div className="mobile-profile profile-avatar">AK</div>
      </div>
    </header>
  );
}
