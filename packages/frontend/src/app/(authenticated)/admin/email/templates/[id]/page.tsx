"use client";

import * as React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Edit, Eye, Trash, Send, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  updater?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function EmailTemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const templateId = params.id as string;

  const { data: template, isLoading, refetch } = useQuery({
    queryKey: ["emailTemplate", templateId],
    queryFn: async () => {
      const result = await adminApi.getEmailTemplateDetail(templateId);
      return result as unknown as EmailTemplate;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteEmailTemplate(templateId),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "テンプレートを削除しました",
      });
      router.push("/admin/email");
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "テンプレートの削除に失敗しました",
        variant: "destructive",
      });
    },
  });

  const getTemplateTypeText = (type: string) => {
    const types: Record<string, string> = {
      NOTIFICATION: "通知メール",
      MARKETING: "マーケティングメール",
      ANNOUNCEMENT: "お知らせ",
      REMINDER: "リマインダー",
      CUSTOM: "カスタムメール",
    };
    return types[type] || type;
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (!template) {
    return <div>テンプレートが見つかりません</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">テンプレート詳細</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/email/templates/${templateId}/preview`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            プレビュー
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/email/templates/${templateId}/send`)}
          >
            <Send className="h-4 w-4 mr-2" />
            送信
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/email/templates/${templateId}/schedule`)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            スケジュール
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/email/templates/${templateId}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            編集
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="h-4 w-4 mr-2" />
                削除
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>テンプレートの削除</DialogTitle>
                <DialogDescription>
                  このテンプレートを削除してもよろしいですか？この操作は取り消せません。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "削除中..." : "削除"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">テンプレート名</div>
                <div className="font-medium">{template.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">種類</div>
                <div className="font-medium">{getTemplateTypeText(template.type)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">ステータス</div>
                <div className={template.isActive ? "text-green-600" : "text-red-600"}>
                  {template.isActive ? "有効" : "無効"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">作成日</div>
                <div>{formatDate(template.createdAt)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">作成者</div>
                <div>{template.creator.name}</div>
              </div>
              {template.updater && (
                <div>
                  <div className="text-sm text-muted-foreground">最終更新者</div>
                  <div>{template.updater.name}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>メール内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">件名</div>
                <div className="p-3 bg-muted rounded-md">{template.subject}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">本文</div>
                <div className="p-3 bg-muted rounded-md whitespace-pre-wrap font-mono">
                  {template.body}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 