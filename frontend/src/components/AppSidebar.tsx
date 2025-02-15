
import {
  DropletIcon,
  TrendingUpIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  BriefcaseIcon,
  LeafIcon,
  LayoutDashboardIcon,
  BellIcon,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const menuItems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Water Quality",
    path: "/dashboard/water",
    icon: DropletIcon,
  },
  {
    title: "Market Links",
    path: "/dashboard/market",
    icon: TrendingUpIcon,
  },
  {
    title: "Education",
    path: "/dashboard/education",
    icon: GraduationCapIcon,
  },
  {
    title: "Healthcare",
    path: "/dashboard/health",
    icon: HeartPulseIcon,
  },
  {
    title: "Employment",
    path: "/dashboard/jobs",
    icon: BriefcaseIcon,
  },
  {
    title: "Climate",
    path: "/dashboard/climate",
    icon: LeafIcon,
  },
  {
    title: "Gender Equality",
    path: "/dashboard/gender",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Updates",
    path: "/dashboard/updates",
    icon: BellIcon,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={location.pathname === item.path ? "bg-accent" : ""}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
