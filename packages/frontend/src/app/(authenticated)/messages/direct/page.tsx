import * as React from "react";
import { Suspense } from "react";
import { DirectMessageList } from "@/components/features/messages/DirectMessageList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DirectMessagesPage() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>ダイレクトメッセージ</CardTitle>
          <CardDescription>
            他のユーザーとのメッセージのやり取りを管理します。
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Suspense fallback={<div>読み込み中...</div>}>
              <DirectMessageList />
            </Suspense>
        </CardContent>
      </Card>
    </div>
  );
} 