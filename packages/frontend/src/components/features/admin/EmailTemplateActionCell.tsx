"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/api/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal,
  Eye,
  Send,
  Edit,
  Copy,
  Power,
  PowerOff,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
}

interface EmailTemplateActionCellProps {
  template: EmailTemplate;
  onSuccess: () => void;
}

export function EmailTemplateActionCell({ template, onSuccess }: EmailTemplateActionCellProps) {
  const { toast } = useToast();
  const router = useRouter();

  // テンプレートの有効/無効化
  const toggleMutation = useMutation({
    mutationFn: () => adminApi.updateEmailTemplate(template.id, { isActive: !template.isActive }),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: `テンプレートを${template.isActive ? '無効' : '有効'}にしました`,
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ステータスの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  // 削除のミューテーション
  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteEmailTemplate(template.id),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "テンプレートを削除しました",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "テンプレートの削除に失敗しました",
        variant: "destructive",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/admin/email/templates/${template.id}`)}>
          <Eye className="mr-2 h-4 w-4" />
          詳細
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/admin/email/templates/${template.id}/send`)}>
          <Send className="mr-2 h-4 w-4" />
          送信
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/admin/email/templates/${template.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          編集
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/admin/email/templates/${template.id}/duplicate`)}>
          <Copy className="mr-2 h-4 w-4" />
          複製
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          if (window.confirm(`テンプレートを${template.isActive ? '無効' : '有効'}にしますか？`)) {
            toggleMutation.mutate();
          }
        }}>
          {template.isActive ? (
            <>
              <PowerOff className="mr-2 h-4 w-4" />
              無効化
            </>
          ) : (
            <>
              <Power className="mr-2 h-4 w-4" />
              有効化
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => {
            if (window.confirm('このテンプレートを削除してもよろしいですか？')) {
              deleteMutation.mutate();
            }
          }}
        >
          <Trash className="mr-2 h-4 w-4" />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 