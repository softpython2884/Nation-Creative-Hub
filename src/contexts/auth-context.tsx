
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
  updateUserRole: (userId: string, newRole: UserRole, isVerified?: boolean) => Promise<void>; 
  getAllUsers: () => User[]; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const MOCK_USERS_STORAGE_KEY = 'mock_users_teamcore';
const CURRENT_USER_STORAGE_KEY = 'currentUser_teamcore';
const SESSION_TOKEN_STORAGE_KEY = 'sessionToken_teamcore';

const getMockUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
    if (storedUsers) {
        try {
            return JSON.parse(storedUsers);
        } catch (e) {
            console.error("Failed to parse mock users from localStorage", e);
            localStorage.removeItem(MOCK_USERS_STORAGE_KEY); // Clear potentially corrupted data
            return [];
        }
    }
    // Initialize with a default owner if no users exist
    const defaultOwner: User = {
      id: 'owner_01',
      name: 'Default Owner',
      email: 'owner@teamcore.dev',
      role: 'owner',
      isVerified: true,
    };
    saveMockUsers([defaultOwner]);
    return [defaultOwner];
  }
  return [];
};

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
        // Ensure mock users are initialized (especially the default owner)
        getMockUsers(); 
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
    const foundUser = mockUsers.find(u => u.email === email); 

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
      role: 'guest', 
      isVerified: false 
    };
    
    mockUsers.push(newUser);
    
    // Special case for initial admin/owner for demo purposes
    if (email === 'admin@teamcore.dev' && pass === 'admin') { // Example admin credentials
        newUser.role = 'admin';
        newUser.isVerified = true;
    }
     if (email === 'owner@teamcore.dev' && pass === 'owner') { // Example owner credentials
        newUser.role = 'owner';
        newUser.isVerified = true;
    }


    saveMockUsers(mockUsers);
        
    setLoading(false);
    alert("Registration successful! Your account is now 'guest' and requires verification by an administrator to gain full access.");
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
      // Ensure that if a user is made 'guest', they are also marked as not verified.
      // And if they are any other role, they are marked as verified.
      if (newRole === 'guest') {
        mockUsers[userIndex].isVerified = false;
      } else {
        mockUsers[userIndex].isVerified = true;
      }

      saveMockUsers(mockUsers);
      if (currentUser?.id === userId) {
        const updatedCurrentUser = { 
            ...currentUser, 
            role: newRole, 
            isVerified: newRole === 'guest' ? false : true
        };
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
