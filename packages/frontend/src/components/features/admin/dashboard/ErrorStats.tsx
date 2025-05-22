import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminDashboardApi } from '@/lib/api/admin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import * as React from "react";
interface ErrorStatsProps {
  period: number;
}

export function ErrorStats({ period }: ErrorStatsProps) {
  const [selectedErrors, setSelectedErrors] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['adminDashboard', period],
    queryFn: () => adminDashboardApi.getDashboardStats(Number(period)),
  });

  const { data: errorDetails } = useQuery({
    queryKey: ['adminErrorDetails', period],
    queryFn: () => adminDashboardApi.getErrorLogDetails(Number(period)),
  });

  const deleteErrorsMutation = useMutation({
    mutationFn: (ids: string[]) => adminDashboardApi.deleteErrorLogs(ids),
    onSuccess: () => {
      toast({
        title: '選択したエラーログを削除しました',
        variant: 'default',
      });
      setSelectedErrors([]);
      queryClient.invalidateQueries({ queryKey: ['adminErrorDetails'] });
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
    onError: () => {
      toast({
        title: 'エラーログの削除に失敗しました',
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!dashboardStats) {
    return null;
  }

  const { errorStats } = dashboardStats;

  const handleToggleError = (errorId: string) => {
    setSelectedErrors(prev =>
      prev.includes(errorId)
        ? prev.filter(id => id !== errorId)
        : [...prev, errorId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedErrors.length === 0) return;
    deleteErrorsMutation.mutate(selectedErrors);
  };

  return (
    <div className="space-y-6">
      {/* エラー概要 */}
      <Card>
        <CardHeader>
          <CardTitle>エラー概要</CardTitle>
          <CardDescription>システムエラーの全体統計</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">{errorStats.totalErrors}</div>
              <div className="text-sm text-muted-foreground">総エラー数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {errorStats.errorsByType.length}
              </div>
              <div className="text-sm text-muted-foreground">エラータイプ数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {errorStats.errorsByUser.length}
              </div>
              <div className="text-sm text-muted-foreground">影響を受けたユーザー数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* エラータイプ別統計 */}
      <Card>
        <CardHeader>
          <CardTitle>エラータイプ別統計</CardTitle>
          <CardDescription>タイプ別のエラー発生状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {errorStats.errorsByType.map((error) => (
              <div key={error.type} className="flex items-center gap-4">
                <div className="w-48 text-sm truncate">{error.type}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-destructive"
                    style={{
                      width: `${(error._count / errorStats.totalErrors) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{error._count}件</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* エラーログ一覧 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>エラーログ一覧</CardTitle>
            <CardDescription>発生したエラーの詳細記録</CardDescription>
          </div>
          {selectedErrors.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={deleteErrorsMutation.isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              選択したログを削除
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {errorDetails?.logs.map((error) => (
              <div
                key={error.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedErrors.includes(error.id)}
                    onCheckedChange={() => handleToggleError(error.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        {error.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(error.createdAt), 'yyyy/MM/dd HH:mm:ss', { locale: ja })}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {error.error}
                    </div>
                    {error.user && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">ユーザー: </span>
                        {error.user.name} ({error.user.email})
                      </div>
                    )}
                    {error.metadata && (
                      <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-auto">
                        {JSON.stringify(error.metadata, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 