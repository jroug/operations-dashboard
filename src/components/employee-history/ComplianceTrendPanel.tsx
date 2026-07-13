/** Visualizes the selected worker's six-month PPE compliance trend. */
import { Chip, Paper } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ComplianceTrendPoint } from "../../types";

interface ComplianceTrendPanelProps {
  complianceScore: number;
  data: ComplianceTrendPoint[];
}

export default function ComplianceTrendPanel({ complianceScore, data }: ComplianceTrendPanelProps) {
  return (
    <Paper className="history-panel compliance-chart-panel" elevation={0}>
      <div className="history-panel-heading"><div><h2>PPE compliance trend</h2><p>Monthly compliance score over the last 6 months</p></div><Chip label="6 months" size="small" variant="outlined" /></div>
      <div className="chart-summary"><strong>{complianceScore}%</strong><span><b>+8%</b> since February</span></div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <defs><linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#397bde" stopOpacity={0.22} /><stop offset="100%" stopColor="#397bde" stopOpacity={0.01} /></linearGradient></defs>
            <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
            <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, "Compliance"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
            <Area type="monotone" dataKey="score" stroke="#397bde" strokeWidth={2.5} fill="url(#complianceFill)" activeDot={{ r: 5, fill: "#397bde", stroke: "#fff", strokeWidth: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
