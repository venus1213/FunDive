"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { adminApi } from "@/lib/api/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmailTemplateActionCell } from "@/components/features/admin/EmailTemplateActionCell";
import { Plus } from "lucide-react";
import * as React from "react";
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

interface EmailTemplateResponse {
  templates: EmailTemplate[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface SearchParams {
  page: number;
  limit: number;
}

export function EmailTemplateList() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["emailTemplates", searchParams],
    queryFn: async () => {
      const response = await adminApi.getEmailTemplates(searchParams);
      return response as unknown as EmailTemplateResponse;
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "エラー",
        description: "テンプレートの取得に失敗しました",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
  };

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

  if (isError) {
    return <div>エラーが発生しました</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => router.push("/admin/email/templates/create")}>
          <Plus className="h-4 w-4 mr-2" />
          新規テンプレート作成
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>テンプレート名</TableHead>
              <TableHead>件名</TableHead>
              <TableHead>種類</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>作成者</TableHead>
              <TableHead>作成日</TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.templates || []).map((template: EmailTemplate) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>{template.subject}</TableCell>
                <TableCell>{getTemplateTypeText(template.type)}</TableCell>
                <TableCell>
                  <span className={template.isActive ? "text-green-600" : "text-red-600"}>
                    {template.isActive ? "有効" : "無効"}
                  </span>
                </TableCell>
                <TableCell>{template.creator.name}</TableCell>
                <TableCell>
                  {new Date(template.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <EmailTemplateActionCell
                    template={template}
                    onSuccess={refetch}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ページネーション */}
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(searchParams.page - 1)}
              disabled={searchParams.page <= 1}
            >
              前へ
            </Button>
            <span className="text-sm">
              {searchParams.page} / {Math.ceil((data?.pagination?.total || 0) / searchParams.limit)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(searchParams.page + 1)}
              disabled={
                searchParams.page >= Math.ceil((data?.pagination?.total || 0) / searchParams.limit)
              }
            >
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 