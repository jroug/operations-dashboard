/** Shared copy and summary-card configuration for the static preview routes. */
import { incidents } from "./incidents";
import { asset } from "./asset";
import { workers } from "./workers";
import type { PlaceholderPageConfig, PlaceholderPageType } from "../types/placeholderPages";

export const placeholderPageConfig: Record<PlaceholderPageType, PlaceholderPageConfig> = {
  "team-performance": {
    eyebrow: "Analytics / Workforce",
    title: "Team performance",
    description: "Compare operational performance, task completion, and pending checklist items across job roles.",
    action: "Generate role report",
    cards: [
      { label: "Active roles", value: "4", note: "Across all locations", icon: "team", tone: "blue" },
      { label: "Average completion", value: "79%", note: "↑ 2.8% this month", icon: "trend", tone: "green" },
      { label: "Highest performing", value: "Quality Analyst", note: "95% completion", icon: "check", tone: "violet" },
    ],
  },
  incidents: {
    eyebrow: "Operations / Incidents",
    title: "Incident tracking",
    description: "Review operational interruptions and the conditions recorded with each event.",
    action: "Export incident log",
    cards: [
      { label: "Recorded incidents", value: `${incidents.length}`, note: "Sample period", icon: "alert", tone: "red" },
      { label: "Critical events", value: `${incidents.filter((item) => item.severity === "Critical").length}`, note: "Requires review", icon: "bell", tone: "amber" },
      { label: "Latest event", value: "28 Jun", note: "Sample dataset · 2026", icon: "check", tone: "green" },
    ],
  },
  "asset-monitoring": {
    eyebrow: "Operations / Assets",
    title: "Asset monitoring",
    description: "Explore a simulated asset connection, environmental sensors, events, and sync progress.",
    action: "Remote controls",
    cards: [
      { label: "Asset status", value: asset.mode, note: "Sample asset online", icon: "asset", tone: "green" },
      { label: "Battery level", value: `${asset.battery}%`, note: "Approx. 2h 18m left", icon: "battery", tone: "blue" },
      { label: "Detections today", value: `${asset.detections.length}`, note: "1 requires review", icon: "alert", tone: "amber" },
    ],
  },
  "operational-insights": {
    eyebrow: "Operations / Insights",
    title: "Operational insights",
    description: "Explore sample suggestions for task readiness, workload, and delivery coordination.",
    action: "Generate recommendations",
    cards: [
      { label: "Members analysed", value: `${workers.length}`, note: "Sample team snapshot", icon: "brain", tone: "violet" },
      { label: "Open recommendations", value: "3", note: "2 high priority", icon: "bell", tone: "amber" },
      { label: "Projected improvement", value: "+12%", note: "Illustrative scenario", icon: "trend", tone: "green" },
    ],
  },
};
