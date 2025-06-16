
"use client";

import type { User } from '@/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for an existing session from localStorage
    setLoading(true);
    try {
      const token = localStorage.getItem('sessionToken_nationquest');
      if (token) {
        const storedUser = localStorage.getItem('currentUser_nationquest');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser) as User);
        } else {
          // Fallback or clear session if user data is missing
          localStorage.removeItem('sessionToken_nationquest');
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('sessionToken_nationquest');
      localStorage.removeItem('currentUser_nationquest');
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, you would validate credentials against a backend
    const user: User = { name: 'Demo User', email: email, id: 'user_123' }; // Mock user
    localStorage.setItem('sessionToken_nationquest', `mock-token-${user.id}`);
    localStorage.setItem('currentUser_nationquest', JSON.stringify(user));
    setCurrentUser(user);
    setLoading(false);
    router.push('/dashboard');
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, you would create a new user in the backend
    const user: User = { name: name, email: email, id: `user_${Date.now()}` }; // Mock user
    // For this demo, we'll log them in directly after registration
    localStorage.setItem('sessionToken_nationquest', `mock-token-${user.id}`);
    localStorage.setItem('currentUser_nationquest', JSON.stringify(user));
    setCurrentUser(user);
    setLoading(false);
    router.push('/dashboard'); // Or redirect to login to reinforce flow
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem('sessionToken_nationquest');
    localStorage.removeItem('currentUser_nationquest');
    setCurrentUser(null);
    setLoading(false);
    router.push('/auth/login');
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  // Render children only when not loading to prevent brief flashes of other content
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
