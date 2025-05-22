import { apiClient } from '../api';
import type { PaginationParams } from '@/types/api';

export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  updatedAt?: string;
  createdAt?: string;
  status: string;
  tags: string[];
  authorId?: string;
  author: {
    name: string;
    email: string;
  };
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface ArticleSearchParams extends PaginationParams {
  status?: 'published' | 'draft' | 'archived';
  tag?: string;
  authorId?: string;
}

// バックエンドAPIレスポンス形式
interface BackendResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const articleApi = {
  getArticles: async (params?: ArticleSearchParams) => {
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
    
    try {
      const response = await apiClient.get<BackendResponse<Article[]>>('/articles');
      return response.data || [];
    } catch (error) {
      console.error('記事一覧の取得に失敗しました:', error);
      return [];
    }
  },

  getArticleBySlug: async (slug: string) => {
    try {
      const response = await apiClient.get<BackendResponse<Article>>(`/articles/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`記事(Slug: ${slug})の取得に失敗しました:`, error);
      throw error;
    }
  },

  // IDで記事を取得する (一覧から該当記事を検索)
  getArticle: async (id: string) => {
    try {
      // 記事一覧を取得して、その中からID一致する記事を探す
      const articles = await articleApi.getArticles();
      const article = Array.isArray(articles) ? articles.find(article => article.id === id) : null;
      
      if (!article) {
        throw new Error(`記事が見つかりません (ID: ${id})`);
      }
      
      return article;
    } catch (error) {
      console.error(`記事(ID: ${id})の取得に失敗しました:`, error);
      throw error;
    }
  },

  createArticle: async (data: {
    title: string;
    description: string;
    content: string;
    thumbnail?: string;
    tags?: string[];
    status?: 'published' | 'draft' | 'archived';
  }) => {
    try {
      const response = await apiClient.post<BackendResponse<Article>>('/articles', data);
      return response.data;
    } catch (error) {
      console.error('記事の作成に失敗しました:', error);
      throw error;
    }
  },

  updateArticle: async (
    id: string,
    data: {
      title?: string;
      description?: string;
      content?: string;
      thumbnail?: string;
      tags?: string[];
      status?: 'published' | 'draft' | 'archived';
    }
  ) => {
    try {
      const response = await apiClient.put<BackendResponse<Article>>(`/articles/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`記事(ID: ${id})の更新に失敗しました:`, error);
      throw error;
    }
  },

  deleteArticle: async (id: string) => {
    try {
      const response = await apiClient.delete<BackendResponse<void>>(`/articles/${id}`);
      // 成功したことを示す値を返す
      return { success: true, message: '記事を削除しました' };
    } catch (error) {
      console.error(`記事(ID: ${id})の削除に失敗しました:`, error);
      throw error;
    }
  }
}; 