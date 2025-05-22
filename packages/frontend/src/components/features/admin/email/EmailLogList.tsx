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
import { Loader2 } from "lucide-react";
import * as React from "react";
interface EmailLog {
  id: string;
  templateId: string;
  recipientId: string;
  status: string;
  error?: string;
  sentAt: string;
  createdAt: string;
  template?: {
    id: string;
    name: string;
  };
  recipient?: {
    id: string;
    name: string;
    email: string;
  };
}

interface SearchParams {
  page: number;
  limit: number;
}

export function EmailLogList() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["emailLogs", searchParams],
    queryFn: async () => {
      const response = await adminApi.getEmailLogs(searchParams);
      // APIから返されるデータを表示用に変換
      return {
        ...response,
        logs: response.logs.map((log: any) => ({
          ...log,
          // 必要に応じて不足しているプロパティを追加
          subject: log.subject || '件名なし',
          sender: { name: '送信者不明' },
          template: log.template || { name: log.templateId }
        }))
      };
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "エラー",
        description: "送信履歴の取得に失敗しました",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
  };

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      PENDING: '送信待ち',
      SENT: '送信済み',
      FAILED: '送信失敗',
      CANCELLED: 'キャンセル',
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'text-green-600';
      case 'FAILED':
        return 'text-red-600';
      case 'PENDING':
        return 'text-yellow-600';
      case 'CANCELLED':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="rounded-md border">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>テンプレート</TableHead>
                <TableHead>件名</TableHead>
                <TableHead>送信者</TableHead>
                <TableHead>受信者数</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>送信日時</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data?.logs || []).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.template?.name || log.templateId}</TableCell>
                  <TableCell>{log.subject || '件名なし'}</TableCell>
                  <TableCell>{log.sender?.name || '送信者不明'}</TableCell>
                  <TableCell>{log.recipientId ? 1 : 0}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(log.status)}>
                      {getStatusText(log.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(log.sentAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/email/logs/${log.id}`)}
                    >
                      詳細
                    </Button>
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
        </>
      )}
    </div>
  );
} 