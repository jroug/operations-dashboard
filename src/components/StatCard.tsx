import type { ElementType, ReactElement, ReactNode } from "react";
import { Card } from "@mui/material";
import Icon from "./Icon";
import type { IconName } from "../types";

interface StatCardProps {
  label: string;
  value: ReactNode;
  meta: ReactNode;
  icon: IconName | ReactElement;
  tone: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  metaClassName?: string;
  metaElement?: ElementType;
}

export default function StatCard({ label, value, meta, icon, tone, className, iconClassName, valueClassName, metaClassName, metaElement: MetaElement = "small" }: StatCardProps) {
  return (
    <Card className={`stat-card${className ? ` ${className}` : ""}`} elevation={0}>
      <span className={`stat-icon${iconClassName ? ` ${iconClassName}` : ""} ${tone}`}>{typeof icon === "string" ? <Icon name={icon} size={21} /> : icon}</span>
      <div className="stat-copy">
        <span>{label}</span>
        <strong className={valueClassName}>{value}</strong>
        <MetaElement className={metaClassName}>{meta}</MetaElement>
      </div>
    </Card>
  );
}
