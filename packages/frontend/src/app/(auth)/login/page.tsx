"use client"

import { useAuthStore } from '@/store/auth'
import { GoogleAuthButton } from '@/components/auth/GoogleSignInButton'
import * as AlertPrimitive from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { InitialSetup } from '@/components/auth/InitialSetup'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleRedirectResult } from '@/lib/auth'

// 型問題を回避するためにコンポーネントをラップ
const Alert = AlertPrimitive.Alert as any
const AlertDescription = AlertPrimitive.AlertDescription as any

export default function LoginPage() {
  const { handleGoogleSignIn, handleInitialSetup, isLoading: storeLoading, error, needsInitialSetup, isAuthenticated, setError } = useAuthStore()
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false)
  const router = useRouter()

  // リダイレクト結果の処理
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setIsProcessingRedirect(true);
        console.log('リダイレクト結果の確認を開始');
        const result = await handleRedirectResult();
        
        if (result) {
          console.log('リダイレクト結果あり:', result);
          if (result.isNewUser) {
            // 新規ユーザーの場合は登録画面へ
            const params = new URLSearchParams();
            params.set('email', result.email || '');
            params.set('name', result.name || '');
            params.set('firebaseUid', result.firebaseUid);
            params.set('idToken', result.idToken);
            
            router.push(`/register/google?${params.toString()}`);
          } else {
            // 既存ユーザーの場合はダッシュボードへ
            router.push('/dashboard');
          }
        } else {
          console.log('リダイレクト結果なし');
        }
      } catch (err) {
        console.error('リダイレクト処理エラー:', err);
        setError(err instanceof Error ? err.message : 'ログイン処理に失敗しました');
      } finally {
        setIsProcessingRedirect(false);
      }
    };
    
    checkRedirectResult();
  }, [router, setError]);

  // 認証状態による画面遷移
  useEffect(() => {
    // 認証済みかつ初期設定が不要な場合のみリダイレクト
    if (isAuthenticated && !needsInitialSetup && !storeLoading && !isProcessingRedirect) {
      console.log('既に認証済みです。ダッシュボードに遷移します');
      router.replace('/dashboard');
    }
  }, [isAuthenticated, needsInitialSetup, storeLoading, isProcessingRedirect, router]);

  const isLoading = storeLoading || isProcessingRedirect;

  if (needsInitialSetup) {
    return <InitialSetup onComplete={async (data) => {
      await handleInitialSetup(data);
      router.replace('/dashboard');
    }} />
  }

  if (isLoading) {
    return (
      <div className="container max-w-lg mx-auto py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">FUNDIVEへようこそ</h1>
        <p className="text-muted-foreground">
          スタートアップと投資家をつなぐプラットフォーム
        </p>
        <p className="text-muted-foreground mt-4">
          Googleアカウントでログインして、FUNDIVEの機能をご利用ください。
          新規登録の方は、ログイン後に役割と表示名を設定できます。
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8">
        <GoogleAuthButton 
          mode="login" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        />
      </div>

      <div className="mt-6 text-sm text-center text-muted-foreground">
        <p>
          ログインすることで、
          <Link href="/terms" className="text-primary hover:underline">利用規約</Link>
          と
          <Link href="/privacy" className="text-primary hover:underline">プライバシーポリシー</Link>
          に同意したものとみなされます。
        </p>
      </div>
    </div>
  )
} 