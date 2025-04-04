"use client";
import { NavMain } from "@/components/nav-main";
import Logo from "@/components/shared/Logo";
import NavUser from "@/components/shared/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  LifeBuoy,
  PieChart,
  Send,
  Settings,
  ShoppingBag,
  SquareTerminal,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type React from "react";
import { useMemo } from "react";

// User navigation data
const userNavData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Shop",
      url: "/user/shop",
      icon: ShoppingBag,
      items: [
        {
          title: "My Shop",
          url: "/user/shop/my-shop",
        },
        {
          title: "Manage Products",
          url: "/user/shop/products",
        },
        {
          title: "Manage Categories",
          url: "/user/shop/category",
        },
        {
          title: "Manage Brands",
          url: "/user/shop/brand",
        },
        {
          title: "Manage Coupon",
          url: "/user/shop/manage-coupon",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/user/settings/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/user/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/user/feedback",
      icon: Send,
    },
  ],
};

// Admin navigation data
const adminNavData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: BarChart3,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Shop Management",
      url: "/admin/shop",
      icon: ShoppingBag,
      items: [
        {
          title: "All Shops",
          url: "/admin/shop/all",
        },
        {
          title: "Products",
          url: "/admin/shop/products",
        },
        {
          title: "Categories",
          url: "/admin/shop/categories",
        },
        {
          title: "Brands",
          url: "/admin/shop/brands",
        },
        {
          title: "Coupons",
          url: "/admin/shop/coupons",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
      items: [
        {
          title: "System Settings",
          url: "/admin/settings/system",
        },
        {
          title: "Admin Profile",
          url: "/admin/settings/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: PieChart,
    },
  ],
};

const AppSidebar = ({
  userRole = "user",
  ...props
}: React.ComponentProps<typeof Sidebar> & { userRole?: "admin" | "user" }) => {
  const pathname = usePathname();

  const navigationData = useMemo(() => {
    return userRole === "admin" ? adminNavData : userNavData;
  }, [userRole]);

  // Add isActive property to navigation items based on current path
  const navItems = useMemo(() => {
    return navigationData.navMain.map((item) => ({
      ...item,
      isActive: pathname.startsWith(item.url),
      items: item.items?.map((subItem) => ({
        ...subItem,
        isActive: pathname === subItem.url,
      })),
    }));
  }, [navigationData.navMain, pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-center">
                <Logo />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
