
export type UserRole = 'guest' | 'verified' | 'contributor' | 'specialist' | 'admin' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean; 
  // Add other relevant fields like avatarUrl, etc. if needed in the future
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
  // For now, we'll skip image management as it requires more infrastructure
}

    