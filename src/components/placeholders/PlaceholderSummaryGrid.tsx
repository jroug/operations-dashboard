/** Maps placeholder-page summary configuration onto the shared StatCard grid. */
import type { PlaceholderSummaryCard } from "../../types/placeholderPages";
import StatCard from "../StatCard";
import PageIcon from "./PageIcon";

interface PlaceholderSummaryGridProps {
  cards: PlaceholderSummaryCard[];
}

export default function PlaceholderSummaryGrid({ cards }: PlaceholderSummaryGridProps) {
  return <section className="placeholder-summary-grid">{cards.map((card) => <StatCard label={card.label} value={card.value} meta={card.note} icon={<PageIcon name={card.icon} size={21} />} tone={card.tone} key={card.label} />)}</section>;
}
