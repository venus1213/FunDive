import { apiClient } from '../api';
import type { ApiResponse, PaginationParams } from '@/types/api';
import type { Profile } from '@/types/profile';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  isSentByMe: boolean;
  isRead: boolean;
  senderId?: string;
  sender: {
    id: string;
    role?: 'entrepreneur' | 'investor' | 'admin';
    profile?: {
      displayName?: string;
    };
  };
}

interface ProjectMessage extends Message {
  projectId: string;
}

interface DirectMessage extends Message {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
}

interface MessagesResponse<T> {
  messages: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

interface MessageStats {
  unreadCount: number;
  lastMessageTime?: string;
}

interface SendDirectMessageParams {
  receiverId: string;      // 受信者のユーザーID
  receiverRole: string;    // 受信者のロール（entrepreneur/investor/admin）
  content: string;         // メッセージ内容（1-2000文字）
  mentionedUserIds?: string[]; // メンションされたユーザーIDリスト
}

interface ConversationResponse {
  conversations: {
    user: {
      id: string;
      name: string;
      email: string;
      profile?: Profile;
    };
    lastMessage: {
      id: string;
      content: string;
      createdAt: string;
      isRead: boolean;
      isSentByMe: boolean;
    };
    unreadCount: number;
  }[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const messageApi = {
  getProjectMessages: async (projectId: string, params?: PaginationParams) => {
    const response = await apiClient.get<MessagesResponse<ProjectMessage>>(`/project-messages/${projectId}`, { params });
    return response;
  },

  sendProjectMessage: async (data: { projectId: string; content: string }) => {
    const response = await apiClient.post<ProjectMessage>('/project-messages', data);
    return response;
  },

  getProjectMembers: async (projectId: string) => {
    const response = await apiClient.get<ProjectMember[]>(`/projects/${projectId}/members`);
    return response;
  },

  getDirectMessageConversations: async (params: PaginationParams) => {
    const response = await apiClient.get<ConversationResponse>('/direct-messages/conversations', { params });
    return response;
  },

  getDirectMessages: async (userId: string, params: PaginationParams) => {
    const response = await apiClient.get<MessagesResponse<DirectMessage>>(`/direct-messages/${userId}`, { params });
    return {
      messages: response.messages,
      pagination: response.pagination
    };
  },

  sendDirectMessage: async (params: SendDirectMessageParams) => {
    const response = await apiClient.post('/direct-messages', params);
    return response;
  },

  getMessageStats: async () => {
    const response = await apiClient.get<MessageStats>('/direct-messages/stats');
    return response;
  },

  markAsRead: async (messageId: string) => {
    const response = await apiClient.put<ApiResponse<void>>(`/direct-messages/${messageId}/read`);
    return response;
  }
}; 