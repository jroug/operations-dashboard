import type { ReactNode } from "react";
import type { PageIconName } from "../../types/placeholderPages";

const iconPaths: Record<PageIconName, ReactNode> = {
  alert: <><path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  arrow: <path d="m9 18 6-6-6-6" />,
  battery: <><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 10v4M6 10v4h8v-4Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0 0 6 3 3 0 0 0 2 5.7A3.5 3.5 0 0 0 12 20V4a3 3 0 0 0-2.5.5Z" /><path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1 0 6 3 3 0 0 1-2 5.7A3.5 3.5 0 0 1 12 20V4a3 3 0 0 1 2.5.5ZM7 9h2M15 9h2M8 14h2M14 14h2" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  robot: <><rect x="4" y="6" width="16" height="13" rx="3" /><path d="M12 2v4M8 11h.01M16 11h.01M8 15h8M2 11h2M20 11h2" /></>,
  team: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  trend: <><path d="M3 3v18h18" /><path d="m7 16 4-5 4 3 5-7" /></>,
};

interface PageIconProps {
  name: PageIconName;
  size?: number;
}

export default function PageIcon({ name, size = 20 }: PageIconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}
