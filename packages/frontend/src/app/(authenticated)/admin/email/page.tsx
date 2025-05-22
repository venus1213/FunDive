"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailTemplateList } from "@/components/features/admin/email/EmailTemplateList";
import { EmailScheduleList } from "@/components/features/admin/email/EmailScheduleList";
import { EmailLogList } from "@/components/features/admin/email/EmailLogList";

export default function AdminEmailPage() {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">メール管理</h1>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">テンプレート</TabsTrigger>
          <TabsTrigger value="schedules">スケジュール</TabsTrigger>
          <TabsTrigger value="logs">送信履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <EmailTemplateList />
        </TabsContent>

        <TabsContent value="schedules">
          <EmailScheduleList />
        </TabsContent>

        <TabsContent value="logs">
          <EmailLogList />
        </TabsContent>
      </Tabs>
    </div>
  );
} 