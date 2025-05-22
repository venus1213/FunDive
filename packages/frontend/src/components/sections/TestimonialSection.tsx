import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import "@radix-ui/react-avatar";
import * as React from "react";

declare module "@radix-ui/react-avatar" {
  interface AvatarProps {
    /** ルートに子要素を渡せるようにする */
    children?: React.ReactNode;
    /** className も不足しているので追加 */
    className?: string;
  }

  interface AvatarFallbackProps {
    children?: React.ReactNode;
    className?: string;
  }
}

const testimonials = [
  {
    content: 'FUNDIVEを通じて理想的な投資家と出会えました。単なる資金提供だけでなく、ビジネスの成長に必要なアドバイスも得られ、スタートアップとして大きく前進できています。',
    author: 'Aさん',
    role: '起業家',
    company: 'A株式会社',
  },
  {
    content: '投資先を探す過程が非常にスムーズでした。起業家との直接的なコミュニケーションが可能で、プロジェクトの詳細を深く理解した上で投資を決定できました。',
    author: 'Bさん',
    role: 'エンジェル投資家',
    company: 'B Ventures',
  },
  {
    content: '共同創業者を探していましたが、FUNDIVEで私のビジョンを共有できるパートナーを見つけることができました。プラットフォームの使いやすさと、信頼性の高いマッチングに感謝しています。',
    author: 'Cさん',
    role: '起業家',
    company: 'C Labs',
  },
];

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            ユーザーの声
          </h2>
          <p className="text-lg text-muted-foreground">
            FUNDIVEを利用した起業家と投資家の声をご紹介
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative overflow-hidden rounded-lg border bg-background p-6 flex flex-col min-h-[220px]"
            >
              <div className="flex-grow mb-6">
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}・{testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 