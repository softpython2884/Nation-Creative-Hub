
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react"; // Import React and useEffect
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/common/logo";
import { navItems } from "@/components/layout/sidebar-nav-items";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { HelpCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context"; // Import useAuth

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/auth/login'); // Use replace to avoid adding to history stack
    }
  }, [currentUser, loading, router]);

  if (loading || (!currentUser && pathname !== '/auth/login')) { // Also check if not already on login page
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  // If there's a user, they can see the dashboard
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r hidden md:block" collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Logo size="md" className="group-data-[collapsible=icon]:hidden"/>
              <Logo size="sm" className="hidden group-data-[collapsible=icon]:block"/>
              <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-full">
              <SidebarMenu className="p-2">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                      tooltip={{ children: item.title, className: "group-data-[collapsible=icon]:block hidden" }}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="p-2 border-t">
            <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center">
                <span className="group-data-[collapsible=icon]:hidden">Help Center</span>
                <HelpCircle className="lucide lucide-help-circle h-5 w-5 hidden group-data-[collapsible=icon]:block"/>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
