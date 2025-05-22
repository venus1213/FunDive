import { auth } from '../firebase';
import { apiClient } from '../api';
import type { ApiResponse } from '@/types/api';
import type { Profile, ProfileVisibility } from '@/types/profile';
import type { User } from '@/types/user';
import type { UserSearchParams } from '@/types/api';
import { userSearchParamsSchema } from '@/types/api';
import { useAuthStore } from '@/store/auth';

export const profileApi = {
  getProfile: async (userId?: string): Promise<User> => {
    const endpoint = userId ? `/profiles/${userId}` : '/profiles/me';
    const response = await apiClient.get<ApiResponse<User>>(endpoint);
    return response;
  },

  updateProfile: async (data: Partial<Profile>) => {
    const { user } = useAuthStore.getState();
    if (!user?.id) throw new Error('認証が必要です');

    const response = await apiClient.put<Profile>(`/profiles/${user.id}`, data);
    return response;
  },

  updateVisibility: async (data: Partial<ProfileVisibility>) => {
    const response = await apiClient.put<ProfileVisibility>('/profiles/visibility', data);
    return response;
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.post<{ url: string }>('/profiles/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  searchUsers: async (params: UserSearchParams) => {
    // パラメータのバリデーション
    const validatedParams = userSearchParamsSchema.parse(params);
    
    try {
      const response = await apiClient.get<{
        users: User[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          total_pages: number;
        };
      }>('/profiles/search', { params: validatedParams });
      
      return response;
    } catch (error) {
      throw error;
    }
  }
};