import * as React from "react";
import { Suspense } from "react";
import { DirectMessages } from "@/components/features/messages/DirectMessages";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function validateUserId(userId: string): Promise<string> {
  if (!userId || typeof userId !== 'string') {
    notFound();
  }
  return userId;
}

type Props = {
  params: Promise<{ userId: string }> | { userId: string };
};

export default async function Page({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const validatedUserId = await validateUserId(resolvedParams.userId);

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>ダイレクトメッセージ</CardTitle>
          <CardDescription>
            メッセージのやり取りを行います。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>読み込み中...</div>}>
            <DirectMessages userId={validatedUserId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}