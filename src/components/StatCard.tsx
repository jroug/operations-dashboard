import { Card } from "@mui/material";
import Icon from "./Icon";
import type { IconName } from "../types";

export default function StatCard({ label, value, meta, icon, tone }: { label: string; value: string; meta: string; icon: IconName; tone: string }) {
  return (
    <Card className="stat-card" elevation={0}>
      <div className={`stat-icon ${tone}`}><Icon name={icon} size={21} /></div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{meta}</small>
      </div>
    </Card>
  );
}