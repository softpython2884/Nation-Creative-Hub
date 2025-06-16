
"use client";

import type { NotificationItem } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

const MAX_NOTIFICATIONS = 20; // Keep a reasonable number of notifications

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    // Mock initial notifications for demo
    return [
      { id: '1', title: 'New Task Assigned', description: 'Design the "Azure Glade" loading screen.', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
      { id: '2', title: 'Comment on "Login Bug"', description: '@JaxCoderius mentioned you: "Can you take a look?"', read: true, timestamp: new Date(Date.now() - 1000 * 60 * 30) },
      { id: '3', title: 'Project Milestone Reached', description: '"Soundtrack Vol. I" is now complete!', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    ];
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notificationData: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: NotificationItem = {
      ...notificationData,
      id: String(Date.now()),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, MAX_NOTIFICATIONS));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

    