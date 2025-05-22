import Link from 'next/link';
import { X, Facebook } from 'lucide-react';

const navigation = {
  product: [
    { name: '機能', href: '/#features' },
    { name: '料金プラン', href: '/#plans' },
    { name: 'ユーザーの声', href: '/#testimonials' },
    { name: '記事一覧', href: '/blog' },
  ],
  support: [
    { name: 'ヘルプセンター', href: '/help' },
    { name: 'お問い合わせ', href: '/contact' },
  ],
  company: [
    { name: '会社概要', href: '/about' },
    { name: 'プライバシーポリシー', href: '/privacy' },
    { name: '利用規約', href: '/terms' },
    { name: '特定商取引法に基づく表記', href: '/legal/commercial-transactions' },
  ],
  social: [
    {
      name: 'X',
      href: 'https://x.com/fundive_jp',
      icon: X,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Fundivejp/61573695749020/?mibextid=wwXIfr&rdid=G9avzXpghM7JoNNS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16K4omPCyv%2F%3Fmibextid%3DwwXIfr',
      icon: Facebook
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold">プロダクト</h3>
            <ul className="mt-4 space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">サポート</h3>
            <ul className="mt-4 space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">会社情報</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">ソーシャル</h3>
            <ul className="mt-4 space-y-3">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} FUNDIVE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 