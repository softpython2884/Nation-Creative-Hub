
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, ListChecks, Users, Settings, Plug, ShieldQuestion, BookOpen, FolderKanban, MessageSquare } from "lucide-react"; // Added ShieldQuestion, BookOpen, FolderKanban, MessageSquare

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  items?: NavItem[];
  roles?: string[]; // Optional: specify roles that can see this item
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: ListChecks,
  },
  {
    title: "Projects", // New item
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    title: "Forums", // New item
    href: "/dashboard/forums",
    icon: MessageSquare,
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: Plug,
  },
  {
    title: "Admin", // New Item
    href: "/dashboard/admin",
    icon: ShieldQuestion,
    roles: ['admin', 'owner'] // Only visible to admin/owner
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  }
];

    