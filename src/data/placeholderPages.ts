/** Shared copy and summary-card configuration for the static preview routes. */
import { incidents } from "./incidents";
import { robot } from "./robot";
import { workers } from "./workers";
import type { PlaceholderPageConfig, PlaceholderPageType } from "../types/placeholderPages";

export const placeholderPageConfig: Record<PlaceholderPageType, PlaceholderPageConfig> = {
  "role-analysis": {
    eyebrow: "Analytics / Workforce",
    title: "Role analysis",
    description: "Compare safety performance, PPE compliance, and common violations across job roles.",
    action: "Generate role report",
    cards: [
      { label: "Active roles", value: "4", note: "Across all worksites", icon: "team", tone: "blue" },
      { label: "Average compliance", value: "79%", note: "↑ 2.8% this month", icon: "trend", tone: "green" },
      { label: "Highest performing", value: "Inspector", note: "95% compliance", icon: "check", tone: "violet" },
    ],
  },
  accidents: {
    eyebrow: "Safety / Incidents",
    title: "Accidents & conditions",
    description: "Review when accidents occurred and the environmental or biometric conditions around them.",
    action: "Export accident log",
    cards: [
      { label: "Recorded accidents", value: `${incidents.length}`, note: "Last 30 days", icon: "alert", tone: "red" },
      { label: "Critical events", value: `${incidents.filter((item) => item.severity === "Critical").length}`, note: "Requires review", icon: "bell", tone: "amber" },
      { label: "Days since last event", value: "15", note: "Site-wide average", icon: "check", tone: "green" },
    ],
  },
  "robot-monitoring": {
    eyebrow: "Operations / Robotics",
    title: "Robot monitoring",
    description: "Monitor patrol status, environmental sensors, detections, and coverage for the Unitree robot.",
    action: "Remote controls",
    cards: [
      { label: "Robot status", value: robot.mode, note: "Live patrol active", icon: "robot", tone: "green" },
      { label: "Battery level", value: `${robot.battery}%`, note: "Approx. 2h 18m left", icon: "battery", tone: "blue" },
      { label: "Detections today", value: `${robot.detections.length}`, note: "1 requires review", icon: "alert", tone: "amber" },
    ],
  },
  "ai-recommendations": {
    eyebrow: "AI / Compliance",
    title: "AI recommendations",
    description: "Review personalised PPE guidance generated from wearables, robot detections, and safety history.",
    action: "Generate recommendations",
    cards: [
      { label: "Workers analysed", value: `${workers.length}`, note: "Latest analysis complete", icon: "brain", tone: "violet" },
      { label: "Open recommendations", value: "6", note: "2 high priority", icon: "bell", tone: "amber" },
      { label: "Projected improvement", value: "+12%", note: "Based on completion", icon: "trend", tone: "green" },
    ],
  },
};
