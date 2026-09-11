/** Charts six-month completion series for all sites or the selected site. */
import { Chip, Paper } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyCompletionPoint, SiteName } from "./types";

interface MonthlyCompletionTrendPanelProps {
  selectedSite: SiteName;
  data: MonthlyCompletionPoint[];
}

export default function MonthlyCompletionTrendPanel({ selectedSite, data }: MonthlyCompletionTrendPanelProps) {
  return (
    <Paper className="location-panel trend-panel" elevation={0}>
      <div className="location-panel-heading"><div><h2>Monthly completion trend</h2><p>Six-month performance by location</p></div><Chip label="Last 6 months" size="small" variant="outlined" /></div>
      <div className="location-chart trend-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 14, left: -22, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#edf1ef" strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#75847d", fontSize: 12 }} />
            <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "#89958f", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, "Completion"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8e5", boxShadow: "0 10px 25px rgba(20,40,32,.09)", fontSize: 12 }} />
            <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, color: "#718078" }} />
            {/* Rendering only relevant series keeps single-site comparisons focused. */}
            {(selectedSite === "All sites" || selectedSite === "Site A") && <Line type="monotone" dataKey="siteA" name="Site A" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />}
            {(selectedSite === "All sites" || selectedSite === "Site B") && <Line type="monotone" dataKey="siteB" name="Site B" stroke="#7557c5" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />}
            {(selectedSite === "All sites" || selectedSite === "Site C") && <Line type="monotone" dataKey="siteC" name="Site C" stroke="#df725c" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
