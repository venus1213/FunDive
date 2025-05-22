import * as React from "react";
import { Suspense } from "react";
import { ProjectMessageList } from "@/components/features/messages/ProjectMessageList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectMessagesPage() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>プロジェクトメッセージ</CardTitle>
          <CardDescription>
            参加しているプロジェクトのメッセージ一覧です。
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Suspense fallback={<div>読み込み中...</div>}>
              <ProjectMessageList />
            </Suspense>
        </CardContent>
      </Card>
    </div>
  );
} 