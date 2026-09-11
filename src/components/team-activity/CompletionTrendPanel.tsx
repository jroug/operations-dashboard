/** Visualizes the selected worker's six-month Task completion trend. */
import { Chip, Paper } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CompletionTrendPoint } from "../../types";

interface CompletionTrendPanelProps {
  completionScore: number;
  data: CompletionTrendPoint[];
}

export default function CompletionTrendPanel({ completionScore, data }: CompletionTrendPanelProps) {
  return (
    <Paper className="history-panel completion-chart-panel" elevation={0}>
      <div className="history-panel-heading"><div><h2>Task completion trend</h2><p>Monthly completion score over the last 6 months</p></div><Chip label="6 months" size="small" variant="outlined" /></div>
      <div className="chart-summary"><strong>{completionScore}%</strong><span><b>{data[data.length - 1].score - data[0].score > 0 ? "+" : ""}{data[data.length - 1].score - data[0].score} pp</b> since February</span></div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <defs><linearGradient id="completionFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.22} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0.01} /></linearGradient></defs>
            <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
            <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, "Completion"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
            <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#completionFill)" activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
