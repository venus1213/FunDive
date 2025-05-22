import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticle } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HTMLAttributes } from 'react';
import { S3Image } from '@/components/ui/s3-image';
import ShareButtonsWrapper from '@/components/features/blog/ShareButtonsWrapper';

// MDXコンポーネントの定義
const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 pl-6 list-disc" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 pl-6 list-decimal" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);
  
  if (!article) {
    return {
      title: '記事が見つかりません | FUNDIVE',
    };
  }

  return {
    title: `${article.frontmatter.title} | FUNDIVE`,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      images: [article.frontmatter.thumbnail],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `/blog/${resolvedParams.slug}`;

  return (
    <>
      <Header />
      <article className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl font-bold">{article.frontmatter.title}</h1>
            <p className="text-lg text-muted-foreground">
              {article.frontmatter.description}
            </p>
            <div className="flex items-center justify-between">
              <time className="text-sm text-muted-foreground">
                {formatDate(article.frontmatter.publishedAt)}
              </time>
              <ShareButtonsWrapper
                url={articleUrl}
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                showLabel={true}
              />
            </div>
            {article.frontmatter.tags && (
              <div className="flex flex-wrap gap-2">
                {article.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-[16/9] mb-8">
            <S3Image
              src={article.frontmatter.thumbnail}
              alt={article.frontmatter.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote source={article.content} components={components} />
          </div>
          
          <div className="mt-16 pt-8 border-t">
            <div className="flex justify-center">
              <ShareButtonsWrapper
                url={articleUrl}
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                showLabel={true}
              />
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
} 