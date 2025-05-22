'use client';

import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HelpCenter = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">ヘルプセンター</h1>
      <p className="text-muted-foreground mb-8">
        FUNDIVEをご利用いただきありがとうございます。よくあるご質問や各種手続きについてご案内します。
      </p>

      <div className="grid gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>よくあるご質問</CardTitle>
            <CardDescription>
              ユーザーの皆様からよく寄せられるご質問をまとめました
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>FUNDIVEとは何ですか？</AccordionTrigger>
                <AccordionContent>
                  FUNDIVEは、投資家と起業家をつなぐプラットフォームです。新しいビジネスアイデアへの投資や、プロジェクトの資金調達を簡単に行うことができます。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>アカウント登録は無料ですか？</AccordionTrigger>
                <AccordionContent>
                  はい、FUNDIVEへのアカウント登録は完全無料です。メッセージのやり取りをするためにはサブスクリプションへの登録が必要です。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>投資はいくらから可能ですか？</AccordionTrigger>
                <AccordionContent>
                  プロジェクトによって最低投資額は異なります。各プロジェクトページで詳細をご確認ください。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>プロジェクトの掲載方法を教えてください</AccordionTrigger>
                <AccordionContent>
                  アカウントにログイン後、ダッシュボードから「プロジェクト作成」を選択し、必要情報を入力してください。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>退会（アカウント削除）はどうすればいいですか？</AccordionTrigger>
                <AccordionContent>
                  退会をご希望の場合は、<Link href="/contact" className="text-primary underline">お問い合わせフォーム</Link>よりご連絡ください。担当者が対応いたします。なお、進行中の投資や資金調達がある場合は、それらが完了するまで退会処理ができない場合があります。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>お問い合わせ</CardTitle>
            <CardDescription>
              ご不明点やお困りのことがございましたら、お気軽にお問い合わせください
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>
              退会手続きを含む各種お問い合わせは、下記のお問い合わせフォームよりご連絡ください。
              通常2営業日以内にご返答いたします。
            </p>
            <div>
              <Button asChild>
                <Link href="/contact">お問い合わせフォームへ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter; 