import { User } from './user';

export type NotificationType =
  | 'message_received'
  | 'project_liked'
  | 'project_bookmarked'
  | 'project_commented'
  | 'project_status_changed'
  | 'user_mentioned'
  | 'report_status_changed'
  | 'subscription_expiring'
  | 'subscription_payment_failed'
  | 'system_announcement';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  isRead: boolean;
  relatedId?: string;
  messageType?: 'direct' | 'project';
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  planInfo: {
    currentPlan: string;
    notificationLimit: number;
    remaining: number;
  };
}

export interface NotificationArchive {
  id: string;
  originalId: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
  archivedAt: string;
  user?: User;
}

export type ActionType =
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'report'
  | 'admin_action';

export type ActivityTargetType =
  | 'user'
  | 'project'
  | 'message'
  | 'report'
  | 'notification'
  | 'subscription';

export interface ActivityLog {
  id: string;
  userId?: string;
  actionType: ActionType;
  targetType: ActivityTargetType;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: User;
} 