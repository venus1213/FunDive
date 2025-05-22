'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { BlogCard } from './BlogCard';
import { BlogSearch } from './BlogSearch';
import { BlogPagination } from './BlogPagination';
import { useBlogStore } from '@/store/blog-store';
import { ArticleListItem } from '@/types/article';

interface BlogListProps {
  initialArticles: ArticleListItem[];
}

export function BlogList({ initialArticles }: BlogListProps) {
  const { setArticles, getCurrentPageItems } = useBlogStore();
  const currentPageItems = getCurrentPageItems();

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles, setArticles]);

  return (
    <div>
      <div className="mb-8">
        <BlogSearch />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentPageItems.map((article) => (
          <BlogCard
            key={article.slug}
            {...article}
          />
        ))}
      </div>

      <BlogPagination />
    </div>
  );
} 