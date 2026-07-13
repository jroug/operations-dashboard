import { useState, type ReactNode } from "react";
import { Button, Chip, IconButton, Popover } from "@mui/material";
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

interface HeaderNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: "alert" | "battery" | "check";
  tone: "critical" | "warning" | "success";
}

const headerNotifications: HeaderNotification[] = [
  { id: "ppe-alert", title: "PPE violation detected", description: "George Papadopoulos · Zone A", time: "2 min ago", icon: "alert", tone: "critical" },
  { id: "device-alert", title: "Worker device battery low", description: "Eleni Kostaki · Warehouse", time: "8 min ago", icon: "battery", tone: "warning" },
  { id: "report-ready", title: "Compliance report ready", description: "Monthly worksite summary", time: "20 min ago", icon: "check", tone: "success" },
];

export default function PageHeader({ variant, eyebrow, title, notificationCount, onBack, statusLabel, actions }: PageHeaderProps) {
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLElement | null>(null);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const classes = variantClasses[variant];
  const heading = <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>;
  const notifications = headerNotifications.slice(0, notificationCount);
  const unreadCount = notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;

  const markAsRead = (notificationId: string) => {
    setReadNotificationIds((current) => current.includes(notificationId) ? current : [...current, notificationId]);
  };

  const markAllAsRead = () => setReadNotificationIds(notifications.map((notification) => notification.id));

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
        <IconButton
          className="icon-button"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          aria-haspopup="true"
          aria-expanded={Boolean(notificationAnchor)}
          onClick={(event) => setNotificationAnchor(event.currentTarget)}
        >
          <Icon name="bell" />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </IconButton>
        <div className="mobile-profile profile-avatar">AK</div>
      </div>
      <Popover
        className="notification-popover"
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={() => setNotificationAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="notification-panel">
          <div className="notification-panel-head">
            <div><strong>Notifications</strong><small>{unreadCount ? `${unreadCount} unread` : "You're all caught up"}</small></div>
            <Button className="notification-mark-all" disabled={unreadCount === 0} onClick={markAllAsRead}>Mark all as read</Button>
          </div>
          <div className="notification-list">
            {notifications.map((notification) => {
              const isUnread = !readNotificationIds.includes(notification.id);

              return (
                <Button className={`notification-item${isUnread ? " unread" : ""}`} onClick={() => markAsRead(notification.id)} key={notification.id}>
                  <span className={`notification-item-icon ${notification.tone}`}><Icon name={notification.icon} size={17} /></span>
                  <span className="notification-item-copy"><strong>{notification.title}</strong><span>{notification.description}</span><small>{notification.time}</small></span>
                  {isUnread && <i className="notification-unread-dot" />}
                </Button>
              );
            })}
            {notifications.length === 0 && <div className="notification-empty"><Icon name="check" size={21} /><span>No notifications</span></div>}
          </div>
        </div>
      </Popover>
    </header>
  );
}
