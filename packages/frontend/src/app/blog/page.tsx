import { getArticles } from '@/lib/articles';
import { BlogList } from '@/components/features/blog/BlogList';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export const metadata = {
  title: 'ブログ | FUNDIVE',
  description: 'FUNDIVEの最新情報をお届けします。',
};

// 動的レンダリングを有効化
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">ブログ</h1>
            <BlogList initialArticles={articles} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 