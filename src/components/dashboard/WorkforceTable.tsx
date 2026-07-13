/** Renders the searchable workforce table and delegates all state changes to its parent page. */
import type { MouseEvent } from "react";
import {
  Button,
  Chip,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";
import WorkerAvatar from "../WorkerAvatar";

export type WorkforceStatusFilter = "all" | "compliant" | "attention";

interface WorkforceTableProps {
  workers: Worker[];
  selectedWorkerId: string;
  query: string;
  status: WorkforceStatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: WorkforceStatusFilter) => void;
  onWorkerSelect: (workerId: string) => void;
  onViewHistory: (workerId: string) => void;
}

export default function WorkforceTable({ workers, selectedWorkerId, query, status, onQueryChange, onStatusChange, onWorkerSelect, onViewHistory }: WorkforceTableProps) {
  const handleViewHistory = (event: MouseEvent<HTMLButtonElement>, workerId: string) => {
    // The dedicated action navigates without also selecting the containing table row.
    event.stopPropagation();
    onViewHistory(workerId);
  };

  return (
    <Paper component="article" className="panel workforce-panel" elevation={0}>
      <div className="panel-header"><div><h2>Workforce status</h2><p>Live worker safety and compliance</p></div><Button className="text-button" endIcon={<Icon name="chevron" size={16} />}>View all</Button></div>
      <div className="table-toolbar">
        <TextField className="search-field" size="small" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search workers..." aria-label="Search workers" slotProps={{ input: { startAdornment: <InputAdornment position="start"><Icon name="search" size={18} /></InputAdornment> } }} />
        <ToggleButtonGroup className="status-filter" exclusive size="small" value={status} onChange={(_, nextStatus: WorkforceStatusFilter | null) => nextStatus && onStatusChange(nextStatus)} aria-label="Compliance filter">
          <ToggleButton value="all"><Icon name="filter" size={15} /> All</ToggleButton><ToggleButton value="compliant">Compliant</ToggleButton><ToggleButton value="attention">Attention</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <TableContainer className="worker-table-wrap">
        <Table className="worker-table">
          <TableHead>
            <TableRow>
              <TableCell>Worker</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>PPE status</TableCell>
              <TableCell>Vitals</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>{workers.map((worker) => <TableRow hover key={worker.id} selected={selectedWorkerId === worker.id} className={selectedWorkerId === worker.id ? "selected" : ""} onClick={() => onWorkerSelect(worker.id)}>
            <TableCell><div className="worker-identity"><WorkerAvatar worker={worker} /><span><strong>{worker.name}</strong><small>{worker.role}</small></span></div></TableCell>
            <TableCell><div className="location-cell"><Icon name="location" size={15} /><span><strong>{worker.zone}</strong><small>{worker.site}</small></span></div></TableCell>
            <TableCell><Chip className={`status-badge ${worker.compliant ? "ok" : "warning"}`} size="small" icon={<span>{worker.compliant ? <Icon name="check" size={13} /> : "!"}</span>} label={worker.compliant ? "Compliant" : "Action needed"} /></TableCell>
            <TableCell><div className="vitals"><Icon name="heart" size={16} /><strong>{worker.heartRate}</strong><small>bpm</small></div></TableCell>
            <TableCell><div className={`device-status ${worker.connected ? "online" : "offline"}`}><span /><strong>{worker.battery}%</strong></div></TableCell>
            <TableCell><Button className="history-action-button" size="small" variant="outlined" endIcon={<Icon name="chevron" size={14} />} onClick={(event) => handleViewHistory(event, worker.id)}>History</Button></TableCell>
          </TableRow>)}</TableBody>
        </Table>
        {workers.length === 0 && <div className="empty-state">No workers match these filters.</div>}
      </TableContainer>
    </Paper>
  );
}
