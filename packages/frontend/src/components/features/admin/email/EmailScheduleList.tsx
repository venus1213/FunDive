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
import { Loader2, Plus } from "lucide-react"; 
import * as React from "react";

interface EmailSchedule {
  id: string;
  name: string;
  description: string | null;
  scheduleType: 'ONE_TIME' | 'RECURRING';
  cronExpression: string | null;
  sendAt: string | null;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
  templateId: string;
  recipientIds: string[];
  variables: Record<string, any>;
}

interface EmailScheduleResponse {
  data: EmailSchedule[];
  total: number;
}

interface SearchParams {
  page: number;
  limit: number;
}

export function EmailScheduleList() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["emailSchedules", searchParams],
    queryFn: async () => {
      const response = await adminApi.getEmailSchedules(searchParams);
      // APIのレスポンス形式を変換
      return {
        data: response.schedules || [],
        total: response.pagination?.total || 0
      };
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "エラー",
        description: "スケジュールの取得に失敗しました",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
  };

  const getScheduleTypeText = (type: string) => {
    return type === 'ONE_TIME' ? '一回限り' : '定期実行';
  };

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      ACTIVE: '有効',
      PAUSED: '一時停止',
      COMPLETED: '完了',
      CANCELLED: 'キャンセル',
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600';
      case 'PAUSED':
        return 'text-yellow-600';
      case 'COMPLETED':
        return 'text-blue-600';
      case 'CANCELLED':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const formatScheduleDateTime = (dateTime: string | null) => {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push("/admin/email/schedules/create")}>
          <Plus className="h-4 w-4 mr-2" />
          新規スケジュール作成
        </Button>
      </div>

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
                  <TableHead>スケジュール名</TableHead>
                  <TableHead>説明</TableHead>
                  <TableHead>種類</TableHead>
                  <TableHead>実行予定</TableHead>
                  <TableHead>送信先</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>最終実行</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.data || []).map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <div className="font-medium">{schedule.name}</div>
                    </TableCell>
                    <TableCell>
                      {schedule.description && (
                          <div className="text-sm text-muted-foreground">
                            {schedule.description}
                          </div>
                        )}
                    </TableCell>
                    <TableCell>{getScheduleTypeText(schedule.scheduleType)}</TableCell>
                    <TableCell>
                      {schedule.scheduleType === 'ONE_TIME' 
                        ? formatScheduleDateTime(schedule.sendAt)
                        : schedule.cronExpression}
                    </TableCell>
                    <TableCell>{schedule.recipientIds.length}名</TableCell>
                    <TableCell>
                      <span className={getStatusColor(schedule.status)}>
                        {getStatusText(schedule.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatScheduleDateTime(schedule.lastRunAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/email/schedules/${schedule.id}`)}
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
                  {searchParams.page} / {Math.ceil((data?.total || 0) / searchParams.limit)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(searchParams.page + 1)}
                  disabled={
                    searchParams.page >= Math.ceil((data?.total || 0) / searchParams.limit)
                  }
                >
                  次へ
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 