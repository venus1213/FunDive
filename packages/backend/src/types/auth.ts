import { Subscription } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  firebaseUid: string;
  isVerified: boolean;
  isAdmin: boolean;
  planType?: string;
  subscription?: Subscription | null;
  isFirstLogin?: boolean;
} 