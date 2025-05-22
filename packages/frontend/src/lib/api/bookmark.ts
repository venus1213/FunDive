import { apiClient } from '../api';
import type { PaginationParams } from '@/types/api';
import type { Project } from '@/types/project';

export interface Bookmark {
  id: string;
  projectId: string;
  userId: string;
  createdAt: string;
  project: Project;
}

interface BookmarksResponse {
  bookmarks: Bookmark[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export const bookmarkApi = {
  getBookmarks: async (params: PaginationParams) => {
    const response = await apiClient.get<BookmarksResponse>('/bookmarks', { params });
    return response;
  },

  addBookmark: async (projectId: string) => {
    const response = await apiClient.post<void>('/bookmarks', { projectId });
    return response;
  },

  removeBookmark: async (projectId: string) => {
    const response = await apiClient.delete<void>(`/bookmarks/${projectId}`);
    return response;
  }
}; 