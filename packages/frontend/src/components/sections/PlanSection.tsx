import * as React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const plans = [
  {
    name: 'フリープラン',
    price: '0',
    description: 'プロジェクトの閲覧とプロジェクト1件の作成が可能な無料プラン',
    features: [
      'プロジェクト1件まで作成可能',
      'プロジェクトの閲覧',
      'メッセージ表示上限30件',
      '起業家プロフィールの閲覧',
      'プロジェクトへのコメント閲覧（一部）',
    ],
    planType: 'free',
  },
  {
    name: '創業仲間募集プラン',
    price: '3,000',
    description: '起業家とのマッチングに特化したスタートアップ向けプラン',
    features: [
      'プロジェクト2件まで作成可能',
      '起業家へのダイレクトメッセージ',
      'メッセージ表示上限50件',
      'SNS情報の閲覧（起業家のみ）',
      '起業家・創業仲間募集pjへのコメント送信可能',
    ],
    planType: 'startup_partner',
  },
  {
    name: 'スタンダードプラン',
    price: '5,000',
    description: 'メッセージ機能が使い放題＆プロジェクト3件まで作成可能なスタンダードプラン',
    features: [
      'プロジェクト3件まで作成可能',
      '全ユーザーへのダイレクトメッセージ',
      'メッセージ表示上限100件',
      '投資家プロフィールの閲覧',
      'SNS情報の閲覧（起業家・投資家）',
    ],
    planType: 'standard',
    popular: true,
  },
  // プレミアムプランは一時的に停止
  // {
  //   name: 'プレミアムプラン',
  //   price: '7,800',
  //   description: '全ての機能が使い放題＆優先表示付きのプレミアムプラン',
  //   features: [
  //     'プロジェクト作成件数無制限',
  //     '全機能が無制限で利用可能',
  //     'メッセージ表示上限300件',
  //     'プロジェクトの優先表示',
  //     '新機能への優先アクセス',
  //   ],
  //   planType: 'premium',
  // },
];

export function PlanSection() {
  return (
    <section id="plans" className="py-16 md:py-24">
      <div className="container max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            料金プラン
          </h2>
          <p className="text-lg text-muted-foreground">
            ビジネスの規模や目的に合わせて最適なプランをお選びください
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-lg border bg-background p-8 h-full flex flex-col ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm">
                  人気
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">¥{plan.price}</span>
                {plan.price !== '要相談' && <span className="text-muted-foreground">/月</span>}
              </div>
              <ul className="mb-6 space-y-3 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-auto" asChild>
                <Link href="/login">
                  まずは登録から
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 