/** Charts heart-rate and fatigue trends for the selected worker's current shift. */
import { Paper } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BiometricTrendPoint } from "../../types";

interface BiometricsPanelProps {
  data: BiometricTrendPoint[];
}

export default function BiometricsPanel({ data }: BiometricsPanelProps) {
  return (
    <Paper className="history-panel biometrics-panel" elevation={0}>
      <div className="history-panel-heading"><div><h2>Biometric activity</h2><p>Heart rate and fatigue throughout today’s shift</p></div><div className="chart-legend"><span className="heart" />Heart rate <span className="fatigue" />Fatigue</div></div>
      <div className="chart-container biometrics-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#82908a", fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
            <Line type="monotone" dataKey="heartRate" name="Heart rate" stroke="#df6666" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="fatigue" name="Fatigue" stroke="#ce8117" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
