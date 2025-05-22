"use client";

import * as React from 'react';
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
  CardDescription,
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
import { ArrowLeft, Pause, Play, Ban, Trash2 } from "lucide-react";
import { useState } from "react";

interface EmailSchedule {
  id: string;
  templateId: string;
  name: string;
  description: string | null;
  recipientIds: string[];
  scheduleType: 'ONE_TIME' | 'RECURRING';
  cronExpression: string | null;
  sendAt: string | null;
  variables: Record<string, any>;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const scheduleId = params.id as string;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: schedule, isLoading, refetch } = useQuery<EmailSchedule, Error>({
    queryKey: ["emailSchedule", scheduleId],
    queryFn: () => adminApi.getEmailScheduleDetail(scheduleId),
  });

  const updateMutation = useMutation({
    mutationFn: (status: 'ACTIVE' | 'PAUSED' | 'CANCELLED') =>
      adminApi.updateEmailSchedule(scheduleId, { status }),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "スケジュールを更新しました",
      });
      setIsDialogOpen(false);
      refetch();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "スケジュールの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteEmailSchedule(scheduleId),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "スケジュールを削除しました",
      });
      router.push('/admin/email?tab=schedules');
    },
    onError: (error: any) => {
      toast({
        title: "エラー",
        description: error?.message || "スケジュールの削除に失敗しました",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
    },
  });

  const { data: template } = useQuery({
    queryKey: ["emailTemplate", schedule?.templateId],
    queryFn: () => adminApi.getEmailTemplateDetail(schedule?.templateId as string),
    enabled: !!schedule?.templateId,
  });

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

  const formatDateTime = (dateTime: string | null) => {
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

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (!schedule) {
    return <div>スケジュールが見つかりません</div>;
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
          <h1 className="text-2xl font-bold">スケジュール詳細</h1>
        </div>

        <div className="flex items-center gap-2">
          {schedule.status === 'ACTIVE' && (
            <Button
              variant="outline"
              onClick={() => updateMutation.mutate('PAUSED')}
            >
              <Pause className="h-4 w-4 mr-2" />
              一時停止
            </Button>
          )}
          {schedule.status === 'PAUSED' && (
            <Button
              variant="outline"
              onClick={() => updateMutation.mutate('ACTIVE')}
            >
              <Play className="h-4 w-4 mr-2" />
              再開
            </Button>
          )}
          {schedule.status !== 'CANCELLED' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Ban className="h-4 w-4 mr-2" />
                  キャンセル
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>スケジュールのキャンセル</DialogTitle>
                  <DialogDescription>
                    このスケジュールをキャンセルしてもよろしいですか？この操作は取り消せません。
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => updateMutation.mutate('CANCELLED')}
                    disabled={updateMutation.isPending}
                  >
                    キャンセル
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {schedule.status === 'CANCELLED' && (
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  削除
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>スケジュールの削除</DialogTitle>
                  <DialogDescription>
                    このスケジュールを完全に削除してもよろしいですか？この操作は取り消せません。
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                  >
                    削除
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
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
                <div className="text-sm text-muted-foreground">スケジュール名</div>
                <div className="font-medium">{schedule.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">説明</div>
                <div className="font-medium">{schedule.description || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">種類</div>
                <div className="font-medium">{getScheduleTypeText(schedule.scheduleType)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">ステータス</div>
                <div className={getStatusColor(schedule.status)}>
                  {getStatusText(schedule.status)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">作成日時</div>
                <div>{formatDateTime(schedule.createdAt)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">更新日時</div>
                <div>{formatDateTime(schedule.updatedAt)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>実行スケジュール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {schedule.scheduleType === 'ONE_TIME' ? (
                <div>
                  <div className="text-sm text-muted-foreground">送信予定日時</div>
                  <div className="font-medium">{formatDateTime(schedule.sendAt)}</div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-muted-foreground">実行スケジュール</div>
                  <div className="font-medium">{schedule.cronExpression}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-muted-foreground">最終実行日時</div>
                <div>{formatDateTime(schedule.lastRunAt)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">次回実行予定</div>
                <div>{formatDateTime(schedule.nextRunAt)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>送信設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">テンプレート</div>
                {template ? (
                  <>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      件名: {template.subject}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    テンプレート情報を読み込み中...
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">送信先</div>
                <div className="font-medium">{schedule.recipientIds.length}名</div>
              </div>
              {schedule.variables && Object.keys(schedule.variables).length > 0 && (
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">カスタム変数</div>
                  <pre className="mt-1 p-2 bg-muted rounded-md">
                    {JSON.stringify(schedule.variables, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}