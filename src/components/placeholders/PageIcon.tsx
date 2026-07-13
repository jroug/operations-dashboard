/** Resolves placeholder-page icon names to shared extracted SVG assets. */
import {
  alertTriangleIcon,
  arrowRightIcon,
  barChartIcon,
  batteryStatusHighIcon,
  brainIcon,
  checkMarkIcon,
  notificationBellIcon,
  robotIcon,
  trendUpIcon,
  workersGroupIcon,
} from "../../assets/icons";
import type { PageIconName } from "../../types/placeholderPages";
import AssetIcon from "../AssetIcon";

const pageIconAssets: Record<PageIconName, string> = {
  alert: alertTriangleIcon,
  arrow: arrowRightIcon,
  battery: batteryStatusHighIcon,
  bell: notificationBellIcon,
  brain: brainIcon,
  chart: barChartIcon,
  check: checkMarkIcon,
  robot: robotIcon,
  team: workersGroupIcon,
  trend: trendUpIcon,
};

interface PageIconProps {
  name: PageIconName;
  size?: number;
}

export default function PageIcon({ name, size = 20 }: PageIconProps) {
  return <AssetIcon source={pageIconAssets[name]} size={size} />;
}
