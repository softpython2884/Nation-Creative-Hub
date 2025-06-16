
export type UserRole = 
  | 'guest'             // New user, unverified
  | 'verified'          // Basic verified user
  | 'Developer'
  | 'Builder'
  | 'Designer'
  | 'Community Manager'
  | 'Moderator'
  | 'Project Manager'
  | 'admin'             // Admin, can manage users/content
  | 'owner';            // Top-level owner

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean; 
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
  link?: string;
}

export interface ProjectSpotlightData {
  title: string;
  description: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
}
