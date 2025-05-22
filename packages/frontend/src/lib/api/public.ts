import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 公開統計情報の型定義
export interface PublicStats {
  totalUsers: number;
  totalProjects: number;
  totalMatches: number;
}

// 公開APIクライアント
export const publicApi = {
  // 公開統計情報を取得
  getStats: async (): Promise<PublicStats> => {
    try {
      const response = await apiClient.get<PublicStats>('/public-stats');
      return response.data;
    } catch (error) {
      console.error('公開統計情報の取得に失敗しました:', error);
      // エラー時のフォールバック値
      return {
        totalUsers: 0,
        totalProjects: 0,
        totalMatches: 0
      };
    }
  }
}; 