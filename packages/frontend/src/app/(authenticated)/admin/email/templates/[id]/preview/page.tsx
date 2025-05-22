"use client";

import * as React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface PreviewResult {
  preview: string;
}

export default function EmailTemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const templateId = params.id as string;
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});

  // テンプレート情報の取得
  const { data: template, isLoading: isTemplateLoading } = useQuery<EmailTemplate>({
    queryKey: ["emailTemplate", templateId],
    queryFn: () => adminApi.getEmailTemplateDetail(templateId),
  });

  // ユーザー一覧の取得
  const { data: users, isLoading: isUsersLoading } = useQuery<{ users: User[] }>({
    queryKey: ["users"],
    queryFn: () => adminApi.searchUsers({ limit: 100 }),
  });

  // プレビューの取得
  const { data: preview, isLoading: isPreviewLoading, refetch: refetchPreview } = useQuery<PreviewResult>({
    queryKey: ["preview", templateId, selectedUserId, customVariables],
    queryFn: () => adminApi.generatePreview(templateId, selectedUserId, customVariables),
    enabled: !!templateId,
  });

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    refetchPreview();
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
        <h1 className="text-2xl font-bold">プレビュー: {template.name}</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>プレビュー設定</CardTitle>
              <CardDescription>
                テストユーザーを選択してプレビューを確認できます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">テストユーザー</label>
                <Select
                  value={selectedUserId}
                  onValueChange={handleUserSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ユーザーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">カスタム変数</label>
                <div className="space-y-2">
                  <Input
                    placeholder="変数名"
                    onChange={(e) => {
                      const name = e.target.value;
                      setCustomVariables(prev => ({ ...prev, [name]: prev[name] || "" }));
                    }}
                  />
                  <Input
                    placeholder="値"
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = Object.keys(customVariables)[0];
                      if (name) {
                        setCustomVariables(prev => ({ ...prev, [name]: value }));
                      }
                    }}
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => refetchPreview()}
                disabled={!selectedUserId || isPreviewLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                プレビューを更新
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>プレビュー</CardTitle>
              <CardDescription>
                実際に送信されるメールのプレビューです
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
                  テストユーザーを選択してプレビューを表示
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 