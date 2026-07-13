export type PlaceholderPageType = "role-analysis" | "accidents" | "robot-monitoring" | "ai-recommendations";

export type PageIconName = "alert" | "arrow" | "battery" | "bell" | "brain" | "chart" | "check" | "robot" | "team" | "trend";

export interface PlaceholderSummaryCard {
  label: string;
  value: string;
  note: string;
  icon: PageIconName;
  tone: string;
}

export interface PlaceholderPageConfig {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  cards: PlaceholderSummaryCard[];
}
