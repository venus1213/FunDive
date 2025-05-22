import { create } from 'zustand';
import { ArticleListItem } from '@/types/article';

interface BlogStore {
  // 状態
  articles: ArticleListItem[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;

  // 検索とフィルタリング
  setSearchQuery: (query: string) => void;
  getFilteredArticles: () => ArticleListItem[];
  
  // ページネーション
  setCurrentPage: (page: number) => void;
  getTotalPages: () => number;
  getCurrentPageItems: () => ArticleListItem[];

  // データ初期化
  setArticles: (articles: ArticleListItem[]) => void;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  // 初期状態
  articles: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,

  // 記事データの設定
  setArticles: (articles) => {
    set({ articles });
  },

  // 検索クエリの設定
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  // フィルタリングされた記事の取得
  getFilteredArticles: () => {
    const { articles, searchQuery } = get();
    if (!searchQuery) return articles;

    return articles.filter((article) => {
      const searchTarget = `
        ${article.title}
        ${article.description}
        ${article.tags?.join(' ') || ''}
      `.toLowerCase();
      return searchTarget.includes(searchQuery.toLowerCase());
    });
  },

  // ページネーション関連
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  getTotalPages: () => {
    const filteredArticles = get().getFilteredArticles();
    const { itemsPerPage } = get();
    return Math.ceil(filteredArticles.length / itemsPerPage);
  },

  getCurrentPageItems: () => {
    const filteredArticles = get().getFilteredArticles();
    const { currentPage, itemsPerPage } = get();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredArticles.slice(start, end);
  },
})); 