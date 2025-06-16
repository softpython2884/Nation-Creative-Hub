
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Bell, Trash2, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useNotifications } from "@/contexts/notification-context";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications ({unreadCount} unread)</span>
          {notifications.length > 0 && (
             <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs p-1 h-auto">
                <CheckCheck className="mr-1 h-3 w-3"/>Mark all read
             </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled className="text-center text-muted-foreground py-4">
            No new notifications
          </DropdownMenuItem>
        ) : (
          <ScrollArea className="h-[300px]">
            <DropdownMenuGroup>
            {notifications.map(notif => (
              <DropdownMenuItem key={notif.id} onSelect={() => markAsRead(notif.id)} className={`flex flex-col items-start gap-1 whitespace-normal ${!notif.read ? 'bg-accent/50' : ''}`}>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                     <span className={`font-semibold ${!notif.read ? 'text-primary' : ''}`}>{notif.title}</span>
                     {!notif.read && <Badge variant="default" className="h-2 w-2 p-0 rounded-full bg-primary"></Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{notif.description}</p>
                  <div className="flex justify-between w-full mt-1">
                    <span className="text-xs text-muted-foreground/80">{formatDistanceToNow(notif.timestamp, { addSuffix: true })}</span>
                    {notif.link && (
                      <Link href={notif.link} className="text-xs text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                        View
                      </Link>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            </DropdownMenuGroup>
          </ScrollArea>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={clearNotifications} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Clear all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

    