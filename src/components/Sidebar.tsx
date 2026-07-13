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
    const employeeHistoryMatch = useMatch("/employee-history/*");

    return (
        <Box component="aside" className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
            <div className="brand">
                <span className="brand-mark"><Icon name="shield" size={23} /></span>
                <span className="brand-text"><strong>SafeWith</strong><b>Carmen</b></span>
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
                <Button component={NavLink} to={`/employee-history/${selectedWorkerId}`} disableRipple className={`nav-item ${employeeHistoryMatch ? "active" : ""}`} onClick={onNavigate}><Icon name="team" /><span>Employee history</span><span className="nav-count">{workers.length}</span></Button>
                <Button component={NavLink} to="/role-analysis" disableRipple className="nav-item" onClick={onNavigate}><Icon name="activity" /><span>Role analysis</span></Button>
                <span className="nav-label secondary">Management</span>
                <Button component={NavLink} to="/worksite-analysis" disableRipple className="nav-item" onClick={onNavigate}><Icon name="activity" /><span>Worksite analysis</span></Button>
                <Button component={NavLink} to="/accidents" disableRipple className="nav-item" onClick={onNavigate}><Icon name="alert" /><span>Accidents</span><span className="notification-dot" /></Button>
                <Button component={NavLink} to="/robot-monitoring" disableRipple className="nav-item" onClick={onNavigate}><Icon name="settings" /><span>Robot monitoring</span></Button>
                <Button component={NavLink} to="/ai-recommendations" disableRipple className="nav-item" onClick={onNavigate}><Icon name="helmet" /><span>AI recommendations</span></Button>
            </nav>

            <div className="system-card">
                <div className="system-card-head"><span className="pulse-dot" /><strong>All systems operational</strong></div>
                <p>Last health check 2 min ago</p>
                <div className="system-meter"><span /></div>
            </div>

            <div className="sidebar-profile">
                <span className="profile-avatar">AK</span>
                <span><strong>Alex Karras</strong><small>Safety Supervisor</small></span>
                {/* <Icon name="chevron" size={16} /> */}
            </div>
        </Box>
    );
}
