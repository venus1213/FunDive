import * as React from "react";
import { Suspense } from "react";
import { NotificationList } from "@/components/features/notifications/NotificationList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>通知一覧</CardTitle>
          <CardDescription>
            あなたへの通知をすべて表示します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>読み込み中...</div>}>
            <NotificationList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
} 