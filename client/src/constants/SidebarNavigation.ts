import { LayoutDashboard, Network, Database, ScrollText, Settings } from "lucide-react";
import { ElementType } from "react";

export interface NavItem {
  name: string;
  href: string;
  icon: ElementType;
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Endpoints", href: "/endpoints", icon: Network },
  { name: "Schema Editor", href: "/schema-editor", icon: Database },
  { name: "Logs & Analytics", href: "/logs", icon: ScrollText },
  { name: "Settings", href: "/settings", icon: Settings },
];
