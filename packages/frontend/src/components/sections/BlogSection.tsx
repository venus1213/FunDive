import * as React from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/features/blog/BlogCard';
import { ArticleListItem } from '@/types/article';

interface BlogSectionProps {
  articles: ArticleListItem[];
}

export function BlogSection({ articles }: BlogSectionProps) {
  // 最新の3記事のみ表示
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">最新情報</h2>
            <p className="text-muted-foreground mt-2">
              FUNDIVEの最新の記事をご覧ください
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">
              すべての記事を見る
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <BlogCard
              key={article.slug}
              {...article}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 