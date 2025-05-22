import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationSettingsForm } from "@/components/features/notifications/NotificationSettingsForm";

export default function NotificationSettingsPage() {
  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>通知設定</CardTitle>
          <CardDescription>
            通知の受信設定を管理できます。各種通知の有効/無効を切り替えることができます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
} 