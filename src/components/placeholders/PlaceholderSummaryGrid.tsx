import { Card } from "@mui/material";
import type { PlaceholderSummaryCard } from "../../types/placeholderPages";
import PageIcon from "./PageIcon";

interface PlaceholderSummaryGridProps {
  cards: PlaceholderSummaryCard[];
}

export default function PlaceholderSummaryGrid({ cards }: PlaceholderSummaryGridProps) {
  return <section className="placeholder-summary-grid">{cards.map((card) => <Card className="placeholder-summary-card" elevation={0} key={card.label}><span className={`placeholder-summary-icon ${card.tone}`}><PageIcon name={card.icon} /></span><div><small>{card.label}</small><strong>{card.value}</strong><p>{card.note}</p></div></Card>)}</section>;
}
