import { apiClient } from '../api';
import type { PaginationParams } from '@/types/api';
import type { NotificationsResponse } from '@/types/notification';

interface NotificationSettings {
  emailEnabled: boolean;
  directMessageEnabled: boolean;
  projectMessageEnabled: boolean;
  mentionEnabled: boolean;
}

interface NotificationParams extends PaginationParams {
  is_read?: boolean;
}

export const notificationApi = {
  getSettings: async () => {
    return await apiClient.get<NotificationSettings>('/notifications/settings');
  },

  updateSettings: async (settings: NotificationSettings) => {
    return await apiClient.put<NotificationSettings>('/notifications/settings', settings);
  },

  getNotifications: async (params?: NotificationParams) => {
    return await apiClient.get<NotificationsResponse>('/notifications', { params });
  },

  markAsRead: async (notificationId: string) => {
    return await apiClient.put<void>(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async () => {
    return await apiClient.put<void>('/notifications/read-all');
  }
}; 