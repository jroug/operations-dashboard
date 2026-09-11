/** Generates a role-colored worker avatar from the worker's initials. */

import {
  Avatar
} from "@mui/material";
import type { Worker } from "../types";

const initials = (name: string) => name.split(" ").map((word) => word[0]).slice(0, 2).join("");

const roleColors: Record<string, string> = {
  "Operations Coordinator": "avatar-blue",
  "Quality Analyst": "avatar-violet",
  "Project Specialist": "avatar-amber",
  "Logistics Coordinator": "avatar-teal",
};


export default function WorkerAvatar({ worker, large = false }: { worker: Worker; large?: boolean }) {
  return <Avatar variant="rounded" className={`worker-avatar ${roleColors[worker.role] ?? "avatar-blue"} ${large ? "large" : ""}`}>{initials(worker.name)}</Avatar>;
}
