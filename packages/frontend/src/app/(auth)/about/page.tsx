'use client';

import React from 'react';
import { Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="container max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8">会社概要</h1>

      <div className="space-y-12">
        {/* 企業情報 */}
        <section className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">企業情報</h2>
          <dl className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">団体名</dt>
              <dd className="md:col-span-2">FUNDIVE</dd>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">設立</dt>
              <dd className="md:col-span-2">2025年5月(予定)</dd>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">代表者</dt>
              <dd className="md:col-span-2">代表取締役 吉永 翔</dd>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">資本金</dt>
              <dd className="md:col-span-2">1,000万円</dd>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">事業内容</dt>
              <dd className="md:col-span-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>投資マッチングプラットフォームの運営</li>
                  <li>経営コンサルティング事業</li>
                  <li>投資家向けアドバイザリーサービス</li>
                </ul>
              </dd>
            </div>
          </dl>
        </section>

        {/* ミッション */}
        <section className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">ミッション</h2>
          <p className="text-muted-foreground">
            「革新的なアイデアと投資を結び、新しい価値を創造する」<br /><br />
            FUNDIVEは、素晴らしいアイデアを持つ起業家と、未来を創る投資家をつなぐプラットフォームとして、
            新しいビジネスの創出と成長をサポートします。私たちは、テクノロジーの力を活用し、
            より効率的で透明性の高い投資マッチングを実現することで、日本のスタートアップエコシステムの発展に貢献します。
            ※ FUNDIVEは現在Beta版です。不具合に関してはお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        {/* 所在地・連絡先 */}
        <section className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">連絡先</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">お問い合わせ</p>
                <a href="/contact" className="text-primary hover:underline">
                  お問い合わせフォームはこちら
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;