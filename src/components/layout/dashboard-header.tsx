
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings, LogOut, UserCircle, ShieldQuestion } from "lucide-react"; // Removed Bell, using NotificationDropdown
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Logo } from "@/components/common/logo";
import { navItems } from "./sidebar-nav-items"; 
import { useAuth } from "@/contexts/auth-context";
import { NotificationDropdown } from "./notification-dropdown"; // Import NotificationDropdown

export function DashboardHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth(); 

  // Determine page title, considering dynamic segments if any
  const activeNavItem = navItems.find(item => 
    pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );
  const pageTitle = activeNavItem?.title || "Dashboard";


  const handleLogout = async () => {
    await logout();
  };

  const userCanAccessAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'owner');

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="p-4 border-b">
            <Logo size="md"/>
          </div>
          <nav className="grid gap-2 text-lg font-medium p-4">
            {navItems.map((item) => {
              if (item.roles && !item.roles.includes(currentUser?.role || '')) {
                return null; // Don't render if user doesn't have required role
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)) ? "text-primary bg-muted" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <h1 className="text-xl font-semibold hidden md:block">{pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <NotificationDropdown /> {/* Use the new NotificationDropdown component */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <UserCircle className="w-7 h-7 text-muted-foreground" />}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{currentUser?.name || "My Account"} {currentUser && <span className="text-xs text-muted-foreground">({currentUser.role})</span>}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userCanAccessAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin"><ShieldQuestion className="mr-2 h-4 w-4" />Admin Panel</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
              </DropdownMenuItem>
              {/* Placeholder for future notifications page link if needed */}
              {/* <DropdownMenuItem asChild><Link href="/dashboard/notifications"><Bell className="mr-2 h-4 w-4" />Notifications</Link></DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
    </header>
  );
}

    