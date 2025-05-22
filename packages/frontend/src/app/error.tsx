'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('エラーが発生しました:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-bold">アクセスが制限されています</h1>
        <p className="text-muted-foreground">
          申し訳ありませんが、現在は日本からのアクセスのみ許可されています。
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => reset()} variant="outline">
            再試行
          </Button>
          <Button onClick={() => window.location.href = '/'}>
            トップページへ
          </Button>
        </div>
      </div>
    </div>
  );
} 