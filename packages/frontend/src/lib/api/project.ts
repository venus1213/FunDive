import { apiClient } from '../api';
import type { PaginationParams } from '@/types/api';
import type { Project } from '@/types/project';

export interface ProjectsResponse {
  projects: Project[];
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
  joinedAt: string;
}

interface ProjectMessage {
  id: string;
  projectId: string;
  projectTitle: string;
  lastMessage: {
    content: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
    };
  };
  unreadCount: number;
}

export interface ProjectChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  projectId: string;
  content: string;
  isRead: boolean;
  messageType: 'project';
  createdAt: string;
  sender?: {
    id: string;
    name: string;
    email: string;
  };
}

interface ProjectMessagesResponse {
  messages: ProjectChatMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface ProjectSearchParams extends PaginationParams {
  query?: string;
  status?: string;
  tags?: string[];
  userId?: string;
  sort?: 'latest' | 'popular';
}

interface ProjectMessageListResponse {
  myProjects: ProjectMessage[];
  otherProjects: ProjectMessage[];
  total: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const projectApi = {
  getProjects: async (params?: ProjectSearchParams) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
    }
    const response = await apiClient.get<ProjectsResponse>(`/projects?${searchParams.toString()}`);
    return response;
  },

  searchProjects: async (params: ProjectSearchParams) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });
    const response = await apiClient.get<ProjectsResponse>(`/projects/search?${searchParams.toString()}`);
    return response;
  },

  getProject: async (projectId: string) => {
    const response = await apiClient.get<Project>(`/projects/${projectId}`);
    return response;
  },

  createProject: async (data: {
    title: string;
    description: string;
    thumbnailUrl?: string;
    tags?: string[];
  }) => {
    const response = await apiClient.post<Project>('/projects', data);
    return response;
  },

  updateProject: async (
    projectId: string,
    data: {
      title?: string;
      description?: string;
      thumbnailUrl?: string;
      tags?: string[];
      status?: 'draft' | 'active' | 'suspended';
    }
  ) => {
    const response = await apiClient.put<Project>(`/projects/${projectId}`, data);
    return response;
  },

  deleteProject: async (projectId: string) => {
    const response = await apiClient.delete<void>(`/projects/${projectId}`);
    return response;
  },

  getProjectMembers: async (projectId: string) => {
    const response = await apiClient.get<ProjectMember[]>(`/projects/${projectId}/members`);
    return response;
  },

  getProjectMessages: async (projectId: string, params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const response = await apiClient.get<ProjectMessagesResponse>(`/project-messages/${projectId}?${searchParams.toString()}`);
    return response;
  },

  sendProjectMessage: async (projectId: string, content: string, mentionedUserIds?: string[]) => {
    const response = await apiClient.post<ProjectMessage>('/project-messages', {
      projectId,
      content,
      mentionedUserIds
    });
    return response;
  },

  getMyProjects: async () => {
    const response = await apiClient.get<ProjectsResponse>('/projects/my');
    return response;
  },

  getProjectMessageList: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<ProjectMessageListResponse>(`/project-messages?page=${page}&limit=${limit}`);
    return response;
  }
}; 