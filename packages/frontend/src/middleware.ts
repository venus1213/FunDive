import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NextRequestの型を拡張
interface GeoRequest extends NextRequest {
  geo?: {
    country?: string;
  };
}

export function middleware(request: GeoRequest) {
  // 開発環境では常にスキップ
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // IP制限が無効な場合はスキップ
  if (process.env.NEXT_PUBLIC_DISABLE_GEO_RESTRICTION === 'true') {
    return NextResponse.next();
  }

  const country = request.geo?.country || 'unknown';
  
  // 認証不要のパスはスキップ
  const publicPaths = ['/terms', '/privacy', '/about'];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }

  // APIルートはスキップ（バックエンドで制御）
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 静的ファイルはスキップ
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|css|js)$/)) {
    return NextResponse.next();
  }

  // 日本以外の国からのアクセスのみブロック（unknownは許可）
  if (country !== 'JP' && country !== 'unknown') {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: '日本からのアクセスのみ許可されています。'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 