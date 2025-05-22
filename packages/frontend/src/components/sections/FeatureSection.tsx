import { Users, Rocket, HandshakeIcon, Shield, MessageSquare, TrendingUp } from 'lucide-react';

const features = [
  {
    title: '投資家とのマッチング',
    description: 'あなたのプロジェクトに最適な投資家とつながります。シンプルな投資プロセスで、効率的な資金調達を実現します。',
    icon: Users,
  },
  {
    title: '共同創業者探し',
    description: 'ビジョンを共有できる共同創業者を見つけましょう。スキルと目標が合致するパートナーとの出会いをサポートします。',
    icon: HandshakeIcon,
  },
  {
    title: 'プロジェクト管理',
    description: 'シンプルで使いやすいプロジェクト管理機能。進捗状況の共有や更新が簡単に行えます。',
    icon: Rocket,
  },
  {
    title: 'セキュアな環境',
    description: '安全な認証システムと暗号化通信により、ユーザーの情報とコミュニケーションを保護します。',
    icon: Shield,
  },
  {
    title: 'ダイレクトメッセージ',
    description: 'プラットフォーム内でシンプルなメッセージのやり取りが可能。スムーズなコミュニケーションを実現します。',
    icon: MessageSquare,
  },
  {
    title: 'プロジェクト分析',
    description: 'プロジェクトの基本的な進捗管理と簡易的なデータ分析機能を提供します。',
    icon: TrendingUp,
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            ビジネスの成長を加速する機能
          </h2>
          <p className="text-lg text-muted-foreground">
            起業家と投資家をつなぎ、ビジネスの成長をサポートする充実した機能群
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-lg border bg-background p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 