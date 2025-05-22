import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from 'react';

export default function CommercialTransactionsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">特定商取引法に基づく表記</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">事業者の名称</h2>
            <p>FUNDIVE</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">代表者名</h2>
            <p>代表取締役 吉永 翔</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">所在地</h2>
            <p>130-0022 東京都墨田区江東橋4-28-5 201</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">連絡先</h2>
            <p>メールアドレス: contact@fundive.jp</p>
            <p>電話番号: 090-8155-2228</p>
            <p>受付時間: 平日 10:00-17:00（土日祝日を除く）</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">販売価格</h2>
            <p>各商品・サービスページに表示された金額</p>
            <p>※表示価格は全て税込みとなります</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">支払方法</h2>
            <p>クレジットカード決済（Stripe決済）</p>
            <p>対応カードブランド：Visa, Mastercard, American Express, JCB</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">商品の引渡し時期</h2>
            <p>決済完了後、即時にサービスをご利用いただけます</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">返品・キャンセルについて</h2>
            <p>デジタルコンテンツの性質上、購入後のキャンセル・返金は原則としてお受けできません</p>
            <p>ただし、システム障害等の当社の責めに帰すべき事由による場合は、個別にご対応させていただきます</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">動作環境</h2>
            <p>推奨ブラウザ：Google Chrome（最新版）</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
} 