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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const sections = {
  preparation: [
    {
      title: 'プロジェクト作成',
      description: '魅力的なプロジェクトページを作成します',
      points: [
        'プロジェクトの基本情報入力',
        '事業内容の詳細な説明',
        '必要資金と資金使途の設定',
        'チーム情報の登録'
      ]
    },
    {
      title: 'プロフィール設定',
      description: '信頼できる起業家としてのプロフィールを作成',
      points: [
        '経歴・実績の記載',
        'プロフィール写真のアップロード',
        '専門分野の設定',
        'SNSアカウントの連携'
      ]
    },
    {
      title: '資料準備',
      description: '投資家の関心を引く資料を用意',
      points: [
        'プロジェクト概要の作成',
        '事業計画書の準備',
        'チーム紹介資料',
        'プレゼン資料の準備'
      ]
    }
  ],
  matching: [
    {
      title: '投資家検索',
      description: 'プロジェクトに最適な投資家を見つける',
      points: [
        '投資家一覧の閲覧',
        '投資分野での絞り込み',
        '投資実績での検索',
        '投資家のブックマーク'
      ]
    },
    {
      title: 'コミュニケーション',
      description: '投資家との効果的な対話',
      points: [
        'プロジェクトメッセージの活用',
        'ダイレクトメッセージの送信',
        '追加資料の共有',
        'ミーティングの調整'
      ]
    },
    {
      title: '商談管理',
      description: '投資家とのやり取りを管理',
      points: [
        'メッセージ履歴の確認',
        '商談状況の記録',
        '通知設定の管理',
        'フォローアップの実施'
      ]
    }
  ],
  management: [
    {
      title: 'プロジェクト管理',
      description: 'プロジェクトの進捗を管理',
      points: [
        'プロジェクト情報の更新',
        '投資家とのやり取り管理',
        '関心を示した投資家の確認',
        'プロジェクトの公開設定'
      ]
    },
    {
      title: '通知管理',
      description: '重要な情報を見逃さない',
      points: [
        'メッセージ通知の設定',
        '新規投資家からの連絡確認',
        'プロジェクト閲覧状況の確認',
        'システム通知の管理'
      ]
    },
    {
      title: 'データ活用',
      description: 'プロジェクトの反響を分析',
      points: [
        'プロジェクトの閲覧数確認',
        '関心を持った投資家の分析',
        'メッセージの反応率確認',
        'フィードバックの収集'
      ]
    }
  ]
};

export default function EntrepreneurGuidePage() {
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

      <h1 className="text-3xl font-bold mb-8">起業家向けガイド</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-muted-foreground">
          FUNDIVEを活用して、あなたのプロジェクトに最適な投資家を見つけましょう。
          このガイドでは、効果的な資金調達のプロセスを段階的に説明します。
        </p>
      </div>

      <Tabs defaultValue="preparation" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preparation">準備</TabsTrigger>
          <TabsTrigger value="matching">マッチング</TabsTrigger>
          <TabsTrigger value="management">管理</TabsTrigger>
        </TabsList>

        <TabsContent value="preparation" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {sections.preparation.map((item, index) => (
              <Card key={index}>
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
        </TabsContent>

        <TabsContent value="matching" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {sections.matching.map((item, index) => (
              <Card key={index}>
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
        </TabsContent>

        <TabsContent value="management" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {sections.management.map((item, index) => (
              <Card key={index}>
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
        </TabsContent>
      </Tabs>

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