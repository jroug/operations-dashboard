import { Paper } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ComplianceComparisonPoint } from "./types";

interface ComplianceBySitePanelProps {
  data: ComplianceComparisonPoint[];
}

export default function ComplianceBySitePanel({ data }: ComplianceBySitePanelProps) {
  return (
    <Paper className="worksite-panel compliance-bars-panel" elevation={0}>
      <div className="worksite-panel-heading"><div><h2>Compliance by site</h2><p>Compared with the 90% target</p></div></div>
      <div className="worksite-chart bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%" margin={{ top: 10, right: 5, left: -22, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#75847d", fontSize: 12 }} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#89958f", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, "Compliance"]} cursor={{ fill: "#f5f8f6" }} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
            <Bar dataKey="compliance" radius={[6, 6, 0, 0]} maxBarSize={48}>{data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="target-note"><span /><p><strong>Target</strong> Minimum accepted compliance: 90%</p></div>
    </Paper>
  );
}
