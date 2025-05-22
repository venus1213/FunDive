'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 via-zinc-100/50 to-white dark:from-black dark:via-zinc-900/50 dark:to-black" />
      </div>

      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          スタートアップの
          <span className="text-primary">マッチング</span>
          プラットフォーム
        </h1>

        <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
          投資家、起業家、共同創業者をつなぐ。
          <br />
          あなたのビジネスを次のステージへ。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/login">
              無料で始める
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">詳しく見る</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 md:mt-16">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">増加中</span>
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground mt-2">登録ユーザー</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">急増中</span>
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground mt-2">プロジェクト</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">成長中</span>
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground mt-2">マッチング実績</span>
          </div>
        </div>
      </div>
    </section>
  );
} 