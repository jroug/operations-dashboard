/** Renders a labeled progress metric shared by placeholder analysis panels. */
interface MetricBarProps {
  label: string;
  value: number;
  color: string;
}

export default function MetricBar({ label, value, color }: MetricBarProps) {
  return <div className="metric-bar"><span><strong>{label}</strong><b>{value}%</b></span><i><em style={{ width: `${value}%`, background: color }} /></i></div>;
}
