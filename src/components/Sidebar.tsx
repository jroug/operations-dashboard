/** Renders responsive primary navigation for expanded, compact, and mobile-drawer states. */
import { Box, Button, IconButton } from "@mui/material";
import Icon from "./Icon";
import { NavLink, useMatch } from "react-router-dom";
import { workers } from "../data/workers";

interface SidebarProps {
    selectedWorkerId: string;
    collapsed: boolean;
    mobileOpen: boolean;
    onToggle: () => void;
    onNavigate: () => void;
}

export default function Sidebar({ selectedWorkerId, collapsed, mobileOpen, onToggle, onNavigate }: SidebarProps) {
    // Match the route family because the link target can reference a different selected worker.
    const teamActivityMatch = useMatch("/team-activity/*");

    return (
        <Box component="aside" className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
            <div className="brand">
                <span className="brand-mark"><Icon name="dashboard" size={23} /></span>
                <span className="brand-text"><strong>Operations</strong><b>Dashboard</b></span>
                <IconButton
                    className="sidebar-toggle"
                    onClick={onToggle}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <span className="sidebar-toggle-glyph"><span /></span>
                </IconButton>
            </div>

            <nav className="nav-menu" aria-label="Main navigation">
                <span className="nav-label">Workspace</span>
                <Button component={NavLink} to="/" end disableRipple className="nav-item" onClick={onNavigate}><Icon name="dashboard" /><span>Overview</span></Button>
                <Button component={NavLink} to={`/team-activity/${selectedWorkerId}`} disableRipple className={`nav-item ${teamActivityMatch ? "active" : ""}`} onClick={onNavigate}><Icon name="team" /><span>Team activity</span><span className="nav-count">{workers.length}</span></Button>
                <Button component={NavLink} to="/team-performance" disableRipple className="nav-item" onClick={onNavigate}><Icon name="activity" /><span>Team performance</span></Button>
                <span className="nav-label secondary">Management</span>
                <Button component={NavLink} to="/location-analytics" disableRipple className="nav-item" onClick={onNavigate}><Icon name="activity" /><span>Location analytics</span></Button>
                <Button component={NavLink} to="/incidents" disableRipple className="nav-item" onClick={onNavigate}><Icon name="alert" /><span>Incident tracking</span><span className="notification-dot" /></Button>
                <Button component={NavLink} to="/asset-monitoring" disableRipple className="nav-item" onClick={onNavigate}><Icon name="settings" /><span>Asset monitoring</span></Button>
                <Button component={NavLink} to="/operational-insights" disableRipple className="nav-item" onClick={onNavigate}><Icon name="check" /><span>Operational insights</span></Button>
            </nav>

            <div className="system-card">
                <div className="system-card-head"><span className="pulse-dot" /><strong>Portfolio demo</strong></div>
                <p>Fictional team · Sample data</p>
                <div className="system-meter"><span /></div>
            </div>

            <div className="sidebar-profile">
                <span className="profile-avatar">AM</span>
                <span><strong>Alex Morgan</strong><small>Operations Manager</small></span>
                {/* <Icon name="chevron" size={16} /> */}
            </div>
        </Box>
    );
}
