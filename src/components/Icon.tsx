/** Resolves shared icon names to their extracted SVG assets. */
import {
  activityWaveIcon,
  alertTriangleIcon,
  arrowRightIcon,
  batteryStatusIcon,
  checkMarkIcon,
  dashboardGridIcon,
  filterLinesIcon,
  heartIcon,
  locationPinIcon,
  moonIcon,
  notificationBellIcon,
  safetyHelmetIcon,
  searchIcon,
  settingsIcon,
  shieldCheckIcon,
  sunIcon,
  userProfileIcon,
  workersGroupIcon,
} from "../assets/icons";
import type { IconName } from "../types";
import AssetIcon from "./AssetIcon";

const iconAssets: Record<IconName, string> = {
  activity: activityWaveIcon,
  alert: alertTriangleIcon,
  battery: batteryStatusIcon,
  bell: notificationBellIcon,
  check: checkMarkIcon,
  chevron: arrowRightIcon,
  dashboard: dashboardGridIcon,
  filter: filterLinesIcon,
  heart: heartIcon,
  helmet: safetyHelmetIcon,
  location: locationPinIcon,
  moon: moonIcon,
  search: searchIcon,
  settings: settingsIcon,
  shield: shieldCheckIcon,
  sun: sunIcon,
  team: workersGroupIcon,
  user: userProfileIcon,
};

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <AssetIcon source={iconAssets[name]} size={size} />;
}
