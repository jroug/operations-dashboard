/** Resolves worksite-specific icon names to shared extracted SVG assets. */
import {
  alertTriangleIcon,
  arrowRightIcon,
  buildingIcon,
  downloadIcon,
  notificationBellIcon,
  trendUpIcon,
  workersGroupIcon,
} from "../../assets/icons";
import AssetIcon from "../AssetIcon";

export type SiteIconName = "alert" | "arrow" | "bell" | "building" | "download" | "team" | "trend";

const siteIconAssets: Record<SiteIconName, string> = {
  alert: alertTriangleIcon,
  arrow: arrowRightIcon,
  bell: notificationBellIcon,
  building: buildingIcon,
  download: downloadIcon,
  team: workersGroupIcon,
  trend: trendUpIcon,
};

interface SiteIconProps {
  name: SiteIconName;
  size?: number;
}

export default function SiteIcon({ name, size = 20 }: SiteIconProps) {
  return <AssetIcon source={siteIconAssets[name]} size={size} />;
}
