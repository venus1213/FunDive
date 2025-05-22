import { auth } from './firebase';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { 
  ApiResponse as BaseApiResponse, 
  ErrorResponse,
  API_ERROR_CODES
} from '@/types/api';

// エラーメッセージの定義
export const ERROR_MESSAGES = {
  [API_ERROR_CODES.UNAUTHORIZED]: '認証が必要です',
  [API_ERROR_CODES.VALIDATION_ERROR]: '入力内容を確認してください',
  [API_ERROR_CODES.NOT_FOUND]: 'リソースが見つかりません',
  [API_ERROR_CODES.SERVER_ERROR]: 'サーバーエラーが発生しました',
  [API_ERROR_CODES.NETWORK_ERROR]: 'ネットワークエラーが発生しました',
  [API_ERROR_CODES.INVALID_INPUT]: '入力内容が無効です',
  [API_ERROR_CODES.FORBIDDEN]: 'アクセスが拒否されました',
  [API_ERROR_CODES.CONFLICT]: 'リソースが競合しています',
} as const;

// 拡張されたリクエスト設定の型定義
interface ExtendedAxiosRequestConfig extends Omit<InternalAxiosRequestConfig, 'headers'> {
  headers?: Record<string, string>;
  retryCount?: number;
}

// APIのレスポンス型定義
export type ApiResponse<T> = BaseApiResponse<T>;

interface Notification {
  id: string;
  type: string;
  title: string;
  content: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
  };
  createdAt: string;
  read: boolean;
}

interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  projectType: string;
  status: string;
  investmentAmount: number | null;
  location: string | null;
  projectStage: string | null;
  popularityScore: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  _count: {
    bookmarks: number;
    messages: number;
  };
}

// ダッシュボードの統計情報の型定義
interface DashboardStats {
  totalProjects: number;
  unreadMessages: number;
  bookmarkCount: number;
  notifications: Notification[];
  recentMessages: Message[];
}

interface PopularProjects {
  projects: Project[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 共通のエラーハンドリング
const handleApiError = async (error: unknown): Promise<never> => {

  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ErrorResponse;
    const status = error.response?.status;

    // エラーの種類に応じた処理
    switch (status) {
      case 401:
        throw new Error(ERROR_MESSAGES[API_ERROR_CODES.UNAUTHORIZED]);
      case 403:
        throw new Error(ERROR_MESSAGES[API_ERROR_CODES.FORBIDDEN] || 'アクセスが拒否されました');
      case 404:
        throw new Error(ERROR_MESSAGES[API_ERROR_CODES.NOT_FOUND]);
      case 409:
        throw new Error(ERROR_MESSAGES[API_ERROR_CODES.CONFLICT] || 'リソースが競合しています');
      case 422:
        if (errorData?.error?.validationErrors?.length) {
          const errorMessages = errorData.error.validationErrors
            .map(err => `${err.path.join('.')}: ${err.message}`)
            .join('\n');
          throw new Error(errorMessages);
        }
        if (errorData?.error?.details) {
          const errorMessages = Object.entries(errorData.error.details)
            .map(([field, message]) => {
              if (Array.isArray(message)) {
                return message.map(err => `${field}: ${err.message}`).join('\n');
              }
              return `${field}: ${message}`;
            })
            .join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(ERROR_MESSAGES[API_ERROR_CODES.VALIDATION_ERROR]);
      case 500:
        throw new Error(ERROR_MESSAGES[API_ERROR_CODES.SERVER_ERROR]);
      default:
        if (!error.response) {
          throw new Error(ERROR_MESSAGES[API_ERROR_CODES.NETWORK_ERROR]);
        }
        throw new Error(errorData?.error?.message || `APIエラー: ${status}`);
    }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error('予期せぬエラーが発生しました');
};

// リトライ設定
const MAX_RETRIES = 2;
const getRetryDelay = (retryCount: number) => Math.min(1000 * Math.pow(2, retryCount), 10000);

// リトライロジックの共通化
const retryRequest = async (config: ExtendedAxiosRequestConfig): Promise<any> => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const newToken = await currentUser.getIdToken(true);
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${newToken}`;
      return api(config);
    }
  } catch (refreshError) {
    return Promise.reject(new Error('認証に失敗しました: ' + refreshError));
  }
  return Promise.reject(new Error('認証に失敗しました'));
};

// axiosインスタンスの設定
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Axiosのインターセプターを設定
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const config = error.config as ExtendedAxiosRequestConfig;
    if (!config) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;

    // 401エラーの場合のリトライ
    if (error.response?.status === 401 && config.retryCount < MAX_RETRIES) {
      const retryCount = config.retryCount + 1;
      config.retryCount = retryCount;
      await new Promise(resolve => setTimeout(resolve, getRetryDelay(retryCount)));
      return retryRequest(config);
    }

    return handleApiError(error);
  }
);

// 型付きのAPIリクエストヘルパー
export const apiClient = {
  get: async <T>(url: string, config?: ExtendedAxiosRequestConfig) => {
    const response = await api.get<T>(url, config);
    return response.data;
  },
  post: async <T>(url: string, data?: unknown, config?: ExtendedAxiosRequestConfig) => {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },
  put: async <T>(url: string, data?: unknown, config?: ExtendedAxiosRequestConfig) => {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },
  delete: async <T>(url: string, config?: ExtendedAxiosRequestConfig) => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

// ダッシュボード関連のAPI
export const dashboardApi = {
  getStats: async () => {
    try {
      const [statsResponse, projectsResponse] = await Promise.all([
        api.get<ApiResponse<DashboardStats>>('/stats'),
        api.get<ApiResponse<PopularProjects>>('/projects/popular')
      ]);

      return {
        totalProjects: statsResponse.data.totalProjects || 0,
        unreadMessages: statsResponse.data.unreadMessages || 0,
        bookmarkCount: statsResponse.data.bookmarkCount || 0,
        notifications: statsResponse.data.notifications || [],
        recentMessages: statsResponse.data.recentMessages || [],
        popularProjects: projectsResponse.data.projects || []
      };
    } catch (error) {

      // エラーの種類に応じて部分的なデータを返す
      const fallbackData = {
        totalProjects: 0,
        unreadMessages: 0,
        bookmarkCount: 0,
        notifications: [],
        recentMessages: [],
        popularProjects: []
      };

      if (error instanceof AxiosError) {
        // statsのリクエストが失敗した場合でも、projectsのデータは取得できている可能性がある
        if (error.config?.url?.includes('/stats') && error.response?.status === 404) {
          try {
            const projectsResponse = await api.get<ApiResponse<PopularProjects>>('/projects/popular');
            return {
              ...fallbackData,
              popularProjects: projectsResponse.data.projects || []
            };
          } catch (projectsError) {
            return fallbackData;
          }
        }
      }

      return fallbackData;
    }
  }
}; 