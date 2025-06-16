
"use client";

import type { User, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (userId: string, newRole: UserRole, isVerified?: boolean) => Promise<void>; // For admin actions
  getAllUsers: () => User[]; // For admin panel user list (mocked)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const MOCK_USERS_STORAGE_KEY = 'mock_users_nationquest';
const CURRENT_USER_STORAGE_KEY = 'currentUser_nationquest';
const SESSION_TOKEN_STORAGE_KEY = 'sessionToken_nationquest';

// Helper to get mock users from localStorage
const getMockUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  return [];
};

// Helper to save mock users to localStorage
const saveMockUsers = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MOCK_USERS_STORAGE_KEY, JSON.stringify(users));
  }
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
        if (token) {
          const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
          if (storedUser) {
            setCurrentUser(JSON.parse(storedUser) as User);
          } else {
            localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUsers = getMockUsers();
    const foundUser = mockUsers.find(u => u.email === email); // Password check omitted for demo

    if (foundUser) {
      if (!foundUser.isVerified && foundUser.role === 'guest') {
         setLoading(false);
         throw new Error("Account not verified. Please wait for admin approval.");
      }
      localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, `mock-token-${foundUser.id}`);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(foundUser));
      setCurrentUser(foundUser);
      router.push('/dashboard');
    } else {
      setLoading(false);
      throw new Error("Invalid email or password.");
    }
    setLoading(false);
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    let mockUsers = getMockUsers();
    if (mockUsers.find(u => u.email === email)) {
      setLoading(false);
      throw new Error("User with this email already exists.");
    }

    const newUser: User = { 
      name, 
      email, 
      id: `user_${Date.now()}`, 
      role: 'guest', // New users start as 'guest'
      isVerified: false 
    };
    
    mockUsers.push(newUser);
    // For demo, one admin user
    if (email === 'admin@nationquest.dev' && pass === 'admin') {
        newUser.role = 'owner';
        newUser.isVerified = true;
    }

    saveMockUsers(mockUsers);
    
    // Don't log in directly, user needs verification
    // setCurrentUser(newUser);
    // localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, `mock-token-${newUser.id}`);
    // localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser));
    
    setLoading(false);
    // Instead of pushing to dashboard, inform user about verification
    // router.push('/auth/login?registered=true'); // Or a specific "pending verification" page
    alert("Registration successful! Please wait for an administrator to verify your account.");
    router.push('/auth/login');
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setCurrentUser(null);
    setLoading(false);
    router.push('/auth/login');
  };

  const updateUserRole = async (userId: string, newRole: UserRole, isVerifiedUpdate?: boolean) => {
    let mockUsers = getMockUsers();
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].role = newRole;
      if (isVerifiedUpdate !== undefined) {
        mockUsers[userIndex].isVerified = isVerifiedUpdate;
      }
      saveMockUsers(mockUsers);
      // If updating current user, update state as well
      if (currentUser?.id === userId) {
        const updatedCurrentUser = { ...currentUser, role: newRole, isVerified: isVerifiedUpdate !== undefined ? isVerifiedUpdate : currentUser.isVerified };
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedCurrentUser));
      }
    } else {
      throw new Error("User not found for role update.");
    }
  };

  const getAllUsers = (): User[] => {
    return getMockUsers();
  };


  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateUserRole,
    getAllUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

    