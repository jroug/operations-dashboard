import { Chip, FormControl, MenuItem, Paper, Select } from "@mui/material";
import type { Worker } from "../../types";
import Icon from "../Icon";
import WorkerAvatar from "../WorkerAvatar";

interface EmployeeProfileCardProps {
  worker: Worker;
  workers: Worker[];
  onWorkerChange: (workerId: string) => void;
}

export default function EmployeeProfileCard({ worker, workers, onWorkerChange }: EmployeeProfileCardProps) {
  return (
    <Paper className="history-profile-card" elevation={0}>
      <div className="history-profile-main">
        <WorkerAvatar worker={worker} large />
        <div className="history-profile-copy">
          <div><h2>{worker.name}</h2><Chip size="small" className={`connection-pill ${worker.connected ? "online" : "offline"}`} icon={<span />} label={worker.connected ? "On site" : "Offline"} /></div>
          <p>{worker.role} <span>•</span> {worker.id} <span>•</span> {worker.site}</p>
          <div className="profile-location"><Icon name="location" size={15} /> Currently in <strong>{worker.zone}</strong></div>
        </div>
      </div>
      <div className="employee-picker">
        <span>View employee</span>
        <FormControl size="small">
          <Select value={worker.id} onChange={(event) => onWorkerChange(event.target.value)}>
            {workers.map((item) => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
}
