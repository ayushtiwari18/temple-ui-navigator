
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  Hotel,
  Calendar,
  FileText,
  Settings,
  DollarSign,
  BarChart3,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      link: "/dashboard",
    },
    {
      title: "Devotees",
      icon: Users,
      link: "/devotees",
    },
    {
      title: "Donations",
      icon: DollarSign,
      link: "/donations",
    },
    {
      title: "Accommodations",
      icon: Hotel,
      link: "/rooms",
    },
    {
      title: "Bookings",
      icon: Calendar,
      link: "/bookings",
    },
    {
      title: "Reports",
      icon: FileText,
      link: "/reports",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      link: "/analytics",
    },
  ];

  const settingsItems = [
    {
      title: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  if (!user) return null;

  return (
    <ShadcnSidebar className="border-r">
      <SidebarContent>
        <div className="py-4 px-3 flex justify-center">
          <div className="text-center">
            <h2 className="font-serif text-xl font-semibold text-temple-800">Dutt Mandir</h2>
            <p className="text-xs text-muted-foreground mt-1">Management System</p>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.link
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Link to={item.link}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto pt-4">
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.link
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Link to={item.link}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="p-4 mt-6">
          <div className="rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-xs text-primary font-medium">Logged in as</p>
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
