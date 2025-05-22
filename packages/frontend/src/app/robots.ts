import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // ベースURL - 実際の公開URLに統一
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.fundive.jp'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog',
          '/blog/*',
          '/login',
          '/register',
          '/forgot-password',
        ],
        disallow: [
          '/api/*',
          '/admin/*',
          '/dashboard/*',
          '/projects/*',
          '/profile/*',
          '/settings/*',
          '/messages/*',
          '/notifications/*',
          '/_next/*',
          '/*.json',
        ],
      },
      {
        // Googlebot向けの特別なルール
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blog',
          '/blog/*',
          '/login',
          '/register',
          '/forgot-password',
          // 公開プロジェクトページがある場合は追加
          // '/projects/public/*',
        ],
        disallow: [
          '/api/*',
          '/admin/*',
          '/dashboard/*',
          '/projects/*',
          '/profile/*',
          '/settings/*',
          '/messages/*',
          '/notifications/*',
          '/_next/*',
          '/*.json',
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
} 