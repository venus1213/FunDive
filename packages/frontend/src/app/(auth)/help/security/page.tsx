'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, AlertTriangle, FileCheck } from 'lucide-react';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

const sections = [
  {
    title: 'アカウントセキュリティ',
    icon: Shield,
    items: [
      {
        title: 'Googleアカウント認証',
        description: '安全なGoogleアカウントを使用した認証システムにより、高度なセキュリティを確保しています。'
      },
      {
        title: 'セッション管理',
        description: '不正アクセスを防ぐため、一定時間操作がない場合は自動的にログアウトされます。'
      },
      {
        title: 'アクセス履歴',
        description: 'ログイン履歴を確認でき、不審なアクセスがあった場合は通知を受け取れます。'
      }
    ]
  },
  {
    title: 'プライバシー保護',
    icon: Lock,
    items: [
      {
        title: '情報公開設定',
        description: 'プロフィール情報の公開範囲を細かく設定できます。必要な情報のみを表示することが可能です。'
      },
      {
        title: 'メッセージ保護',
        description: 'メッセージのやり取りは暗号化され、関係者以外からのアクセスは制限されています。'
      },
      {
        title: '通知設定',
        description: '通知の種類や頻度をカスタマイズでき、重要な情報のみを受け取ることができます。'
      }
    ]
  },
  {
    title: 'プロジェクト保護',
    icon: FileCheck,
    items: [
      {
        title: '公開設定',
        description: 'プロジェクトの公開範囲を設定でき、特定の投資家のみにアクセスを許可することができます。'
      },
      {
        title: '資料管理',
        description: 'アップロードした資料は安全に保管され、許可された人のみがアクセスできます。'
      },
      {
        title: 'コミュニケーション管理',
        description: 'プロジェクトに関するメッセージやコメントは、関係者のみが閲覧できます。'
      }
    ]
  }
];

const securityTips = [
  'Googleアカウントの二要素認証を有効にして、アカウントの安全性を高めてください。',
  '信頼できる環境からのみログインし、公共のWi-Fiでの利用は避けてください。',
  'プロフィール情報の公開範囲を定期的に確認し、必要に応じて調整してください。',
  'プロジェクト情報の公開範囲を適切に設定し、機密情報の保護に努めてください。',
  '不審なメッセージや行動を見かけた場合は、すぐにサポートに報告してください。'
];

export default function SecurityGuidePage() {
  return (
    <div className="container max-w-4xl mx-auto py-24 px-4">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/help" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            ヘルプセンターに戻る
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">セキュリティガイド</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-muted-foreground">
          FUNDIVEは、ユーザーの安全とプライバシーの保護を最優先事項としています。
          このガイドでは、プラットフォームのセキュリティ機能と、安全な利用のためのベストプラクティスを説明します。
        </p>
      </div>

      {/* セキュリティ警告 */}
      <Alert className="mb-12">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>重要なお知らせ</AlertTitle>
        <AlertDescription>
          FUNDIVEのスタッフがメールや電話で直接パスワードやアカウント情報を聞くことは一切ありません。
          不審な連絡があった場合は、直ちにお問い合わせフォームからご連絡ください。
        </AlertDescription>
      </Alert>

      {/* セキュリティセクション */}
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 rounded-full p-2">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* セキュリティTips */}
      <div className="mt-12 bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-6">セキュリティTips</h2>
        <ul className="space-y-4">
          {securityTips.map((tip, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          セキュリティに関する質問や懸念がありますか？
        </p>
        <Button asChild>
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </div>
    </div>
  );
} 