'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: 'アカウントを作成',
    description: 'Googleアカウントを使用して簡単に登録できます。メールアドレスの認証は自動的に完了します。',
    points: [
      '「無料で始める」ボタンをクリック',
      'Googleアカウントでログイン',
      'ユーザータイプ（投資家/起業家）を選択',
      'プロフィール情報を入力'
    ]
  },
  {
    title: 'プロフィールを設定',
    description: '他のユーザーがあなたのことを知るために、プロフィールを充実させましょう。',
    points: [
      '基本情報の入力',
      'プロフィール写真のアップロード',
      '経歴や実績の追加',
      '専門分野の設定'
    ]
  },
  {
    title: 'プラットフォームを探索',
    description: 'FUNDIVEの主要な機能を使って、投資や起業の機会を見つけましょう。',
    points: [
      'ダッシュボードで最新情報を確認',
      'ユーザー検索（投資家/起業家）',
      'プロジェクトの検索・閲覧',
      'メッセージ機能の利用'
    ]
  },
  {
    title: '活動を開始',
    description: 'プラットフォームでの活動を始めましょう。',
    points: [
      'プロジェクトの作成（起業家の場合）',
      '興味のあるプロジェクトのブックマーク',
      'ダイレクトメッセージで連絡',
      'プロジェクトメッセージでの相談'
    ]
  }
];

export default function GettingStartedPage() {
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

      <h1 className="text-3xl font-bold mb-8">はじめての方へ</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-muted-foreground">
          FUNDIVEへようこそ！このガイドでは、プラットフォームの使い方の基本を説明します。
          数ステップで簡単に始められます。
        </p>
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="bg-card rounded-lg p-6 border">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  {index + 1}. {step.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          さらに詳しい情報が必要ですか？
        </p>
        <Button asChild>
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </div>
    </div>
  );
} 