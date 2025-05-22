'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const sections = [
  {
    title: '投資プロセス',
    description: 'FUNDIVEでの投資の流れを説明します。',
    content: [
      {
        title: '1. プロジェクトの探索',
        description: '興味のある分野やステージのプロジェクトを見つけましょう。',
        points: [
          'プロジェクト検索機能の利用',
          '条件フィルターの活用',
          'プロジェクトの詳細確認',
          'ブックマーク機能の活用'
        ]
      },
      {
        title: '2. 起業家とのコンタクト',
        description: '興味のあるプロジェクトの起業家と連絡を取ります。',
        points: [
          'プロジェクトメッセージの送信',
          'ダイレクトメッセージでの連絡',
          '追加資料の依頼',
          'ミーティングの調整'
        ]
      },
      {
        title: '3. プロジェクト管理',
        description: '投資検討中のプロジェクトを管理します。',
        points: [
          'ブックマークの整理',
          '進行中の商談の管理',
          '通知設定のカスタマイズ',
          'メッセージ履歴の確認'
        ]
      }
    ]
  },
  {
    title: 'プロフィール最適化',
    description: '魅力的な投資家プロフィールの作成方法を説明します。',
    content: [
      {
        title: 'プロフィールの充実',
        description: '起業家に信頼されるプロフィールを作成します。',
        points: [
          '投資実績の記載',
          '専門分野の明確化',
          'プロフィール写真の設定',
          '自己紹介文の最適化'
        ]
      },
      {
        title: '検索表示の最適化',
        description: '起業家からの発見率を高めます。',
        points: [
          '投資関心領域の設定',
          '投資可能金額の明示',
          'キーワードの最適化',
          'アクティブ状態の維持'
        ]
      }
    ]
  }
];

export default function InvestorGuidePage() {
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

      <h1 className="text-3xl font-bold mb-8">投資家向けガイド</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-muted-foreground">
          FUNDIVEを通じて、革新的なスタートアップへの投資機会を見つけましょう。
          このガイドでは、プラットフォームを活用した効果的な投資プロセスを説明します。
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
            <p className="text-muted-foreground mb-6">{section.description}</p>
            
            <div className="grid gap-6 md:grid-cols-2">
              {section.content.map((item, itemIndex) => (
                <Card key={itemIndex}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
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