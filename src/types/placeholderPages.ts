/** Contracts for configuring and rendering the static preview routes. */
export type PlaceholderPageType = "team-performance" | "incidents" | "asset-monitoring" | "operational-insights";

export type PageIconName = "alert" | "arrow" | "battery" | "bell" | "brain" | "chart" | "check" | "asset" | "team" | "trend";

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
