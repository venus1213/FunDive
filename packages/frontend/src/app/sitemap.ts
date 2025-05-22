import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ベースURL - 実際の環境変数を使用
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.fundive.jp'
  
  // 静的なページのリスト - プロジェクト構造に基づいて最適化
  const staticPages = [
    // 公開ページ
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 認証関連のページ - 括弧を除去して実際のURLに合わせる
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/forgot-password`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // 認証後のページはサイトマップから除外（robots.txtと一致させる）
  ] as MetadataRoute.Sitemap

  // ブログ記事を動的に追加
  try {
    const articles = await getArticles()
    const blogPages = articles.map(article => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // ここで他の公開コンテンツを追加できます
    // 例: 公開プロジェクトなど
    // const publicProjects = await getPublicProjects()
    // const projectPages = publicProjects.map(...)

    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('サイトマップ生成中にブログ記事の取得に失敗しました:', error)
    return staticPages
  }
} 