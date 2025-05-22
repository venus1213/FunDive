"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function SendEmailTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const templateId = params.id as string;
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});

  // テンプレート情報の取得
  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ["emailTemplate", templateId],
    queryFn: () => adminApi.getEmailTemplateDetail(templateId),
  });

  // ユーザー一覧の取得
  const { data: users, isLoading: isUsersLoading } = useQuery<{ users: User[] }>({
    queryKey: ["users"],
    queryFn: () => adminApi.searchUsers({ limit: 100 }),
  });

  // プレビューの取得
  const { data: preview, isLoading: isPreviewLoading } = useQuery({
    queryKey: ["preview", templateId, selectedUserIds[0], customVariables],
    queryFn: () => adminApi.generatePreview(templateId, selectedUserIds[0], customVariables),
    enabled: !!selectedUserIds[0],
  });

  // 送信のミューテーション
  const sendMutation = useMutation({
    mutationFn: () => adminApi.sendEmail({
      templateId,
      recipientIds: selectedUserIds,
      variables: customVariables,
    }),
    onSuccess: () => {
      toast({
        title: "送信完了",
        description: "メールを送信しました",
      });
      router.push("/admin/email");
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "メールの送信に失敗しました",
        variant: "destructive",
      });
    },
  });

  const handleUserSelect = (userId: string, checked: boolean) => {
    setSelectedUserIds(prev => 
      checked 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  };

  if (isTemplateLoading || isUsersLoading) {
    return <div>読み込み中...</div>;
  }

  if (!template) {
    return <div>テンプレートが見つかりません</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">メール送信: {template.name}</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>送信設定</CardTitle>
              <CardDescription>
                送信先ユーザーを選択してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">送信先ユーザー ({selectedUserIds.length}名選択中)</label>
                <ScrollArea className="h-[200px] border rounded-md p-2">
                  {users?.users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onCheckedChange={(checked) => handleUserSelect(user.id, checked as boolean)}
                      />
                      <label className="text-sm">
                        {user.name} ({user.email})
                      </label>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  if (window.confirm(`選択した${selectedUserIds.length}名のユーザーにメールを送信しますか？`)) {
                    sendMutation.mutate();
                  }
                }}
                disabled={selectedUserIds.length === 0 || sendMutation.isPending}
              >
                <Send className="h-4 w-4 mr-2" />
                {sendMutation.isPending ? "送信中..." : `${selectedUserIds.length}名に送信`}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>プレビュー</CardTitle>
              <CardDescription>
                送信されるメールのプレビューです
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isPreviewLoading ? (
                <div>プレビューを生成中...</div>
              ) : preview ? (
                <>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">件名</div>
                    <div className="p-3 bg-muted rounded-md">{template?.subject || ''}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">本文</div>
                    <div 
                      className="p-3 bg-muted rounded-md font-mono whitespace-pre-wrap"
                      style={{ whiteSpace: 'pre-wrap' }}
                      dangerouslySetInnerHTML={{ 
                        __html: preview?.preview?.replace(/\n/g, '<br />') || ''
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  送信先ユーザーを選択してプレビューを表示
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 