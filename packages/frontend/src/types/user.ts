import { Project, Message, Bookmark, Report } from './project';
import { Notification, NotificationArchive, ActivityLog } from './notification';
import { Payment, ErrorLog } from './payment';

export type Role = 'entrepreneur' | 'investor' | 'admin';

export type PlanType = 'free' | 'standard' | 'premium' | 'startup_partner';

// インラインのプロフィール型を分離
export interface InlineProfile {
  id: string;
  userId: string;
  name: string;
  displayName?: string;
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
  skills?: string[];
  interests?: string[];
  is_public: boolean;
  visible_fields: string[];
  createdAt: string;
  updatedAt: string;
}

// インラインのサブスクリプション型を分離
export interface InlineSubscription {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'expired';
  planType: string;
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firebaseUid: string;
  planType: PlanType;
  role: string;
  isAdmin: boolean;
  isVerified: boolean;
  isFirstLogin?: boolean;
  profile: {
    name: string;
    displayName: string;
    bio: string | null;
    company: string | null;
    position: string | null;
    location: string | null;
    website: string | null;
    social_links: Record<string, string> | null;
    skills: string[];
    interests: string[];
    is_public: boolean;
    visible_fields: string[];
  };
  subscription: {
    status: string;
    currentPeriodEnd: string;
  };
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  invitationExpires?: string;  // 招待期限
  invitedBy?: string;         // 招待者のID
  createdAt: string;
  updatedAt: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
  
  // Relations
  projects?: Project[];
  sentMessages?: Message[];
  receivedMessages?: Message[];
  bookmarks?: Bookmark[];
  reports?: Report[];
  notifications?: Notification[];
  notificationArchives?: NotificationArchive[];
  notificationSetting?: NotificationSetting;
  pendingSubscription?: PendingSubscription;
  subscriptionHistory?: SubscriptionHistory[];
  activityLogs?: ActivityLog[];
  payments?: Payment[];
  errorLogs?: ErrorLog[];
  mentionedInMessages?: Message[];
}

export interface Profile {
  id: string;
  userId: string;
  name?: string;
  displayName?: string;
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
  };
  skills: string[];
  interests: string[];
  is_public: boolean;
  visible_fields: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSetting {
  id: string;
  userId: string;
  emailEnabled: boolean;
  directMessageEnabled: boolean;
  projectMessageEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  nextPlanPriceId?: string;
  nextPlanStartDate?: string;
  prorationAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'unpaid'
  | 'trialing'
  | 'upgraded'
  | 'downgrade_scheduled'
  | 'pending_downgrade'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused';

export interface PendingSubscription {
  id: string;
  userId: string;
  planType: PlanType;
  billingCycle: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface SubscriptionHistory {
  id: string;
  userId: string;
  planName: string;
  amount: number;
  status: SubscriptionStatus;
  stripeSubscriptionId: string;
  previousPlanType?: PlanType;
  newPlanType: PlanType;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface UserProfile {
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  avatar?: string;
} 