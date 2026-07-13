/** Provides a consistent heading and optional control area for placeholder panels. */
import { Chip } from "@mui/material";

interface PanelHeadingProps {
  title: string;
  description: string;
  control?: string;
}

export default function PanelHeading({ title, description, control }: PanelHeadingProps) {
  return <div className="placeholder-panel-heading"><div><h2>{title}</h2><p>{description}</p></div>{control && <Chip size="small" variant="outlined" label={control} />}</div>;
}
