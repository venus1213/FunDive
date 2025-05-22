import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi, TimeSeriesStats } from '@/lib/api/admin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import * as React from "react";
interface EmailStatsProps {
  period: number;
}

export function EmailStats({ period }: EmailStatsProps) {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['adminDashboard', period],
    queryFn: () => adminDashboardApi.getDashboardStats(Number(period)),
  });

  const { data: timeSeriesStats } = useQuery<TimeSeriesStats>({
    queryKey: ['adminTimeSeriesStats', period],
    queryFn: () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - period);
      return adminDashboardApi.getTimeSeriesStats(startDate, endDate, 'day');
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

  const { emailStats } = dashboardStats;

  return (
    <div className="space-y-6">
      {/* メール送信概要 */}
      <Card>
        <CardHeader>
          <CardTitle>メール送信概要</CardTitle>
          <CardDescription>メール送信の全体統計</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold">{emailStats.totalEmails}</div>
              <div className="text-sm text-muted-foreground">総送信数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {emailStats.successfulEmails}
              </div>
              <div className="text-sm text-muted-foreground">送信成功</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {emailStats.failedEmails}
              </div>
              <div className="text-sm text-muted-foreground">送信失敗</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {emailStats.successRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">成功率</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 送信状況の推移 */}
      <Card>
        <CardHeader>
          <CardTitle>送信状況の推移</CardTitle>
          <CardDescription>期間中のメール送信数の推移</CardDescription>
        </CardHeader>
        <CardContent>
          {!timeSeriesStats?.emailSending?.length ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              データがありません
            </div>
          ) : (
            <div className="space-y-4">
              {timeSeriesStats.emailSending.map((data: { createdAt: string; _count: number }) => {
                if (!data?.createdAt) {
                  return null;
                }
                
                try {
                  const date = new Date(data.createdAt);
                  const formattedDate = format(date, 'yyyy/MM/dd', { locale: ja });
                  
                  return (
                    <div key={data.createdAt} className="flex items-center gap-4">
                      <div className="w-32 text-sm">
                        {formattedDate}
                      </div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(data._count / Math.max(...timeSeriesStats.emailSending.map((d: { _count: number }) => d._count))) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="w-16 text-sm text-right">{data._count}件</div>
                    </div>
                  );
                } catch (error) {
                  console.error('Date formatting error:', error, data);
                  return null;
                }
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* テンプレート別統計 */}
      <Card>
        <CardHeader>
          <CardTitle>テンプレート別統計</CardTitle>
          <CardDescription>テンプレートごとの送信状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailStats.templateStats.map((template) => (
              <div key={template.templateId} className="flex items-center gap-4">
                <div className="w-48 text-sm truncate">
                  {template.template?.name || getTemplateLabel(template.templateId)}
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(template._count / emailStats.totalEmails) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{template._count}件</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 最近の送信失敗 */}
      <Card>
        <CardHeader>
          <CardTitle>最近の送信失敗</CardTitle>
          <CardDescription>送信に失敗したメールの詳細</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailStats.recentFailures.map((failure) => (
              <div
                key={failure.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{failure.template.name}</div>
                  <div className="text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {failure.status}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  送信日時: {format(new Date(failure.sentAt), 'yyyy/MM/dd HH:mm', { locale: ja })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 送信効率分析 */}
      <Card>
        <CardHeader>
          <CardTitle>送信効率分析</CardTitle>
          <CardDescription>メール送信の効率性指標</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">平均送信時間</h4>
              <div className="text-3xl font-bold text-primary">
                {getAverageSendingTime(emailStats)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                送信要求から完了までの平均時間
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">エラー率の推移</h4>
              <div className="text-3xl font-bold text-primary">
                {emailStats.failureRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                前期比: {getFailureRateChange(emailStats)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// テンプレートのラベルを取得する関数（仮の実装）
function getTemplateLabel(templateId: string): string {
  const labels: Record<string, string> = {
    NOTIFICATION: '通知メール',
    MARKETING: 'マーケティング',
    ANNOUNCEMENT: 'お知らせ',
    REMINDER: 'リマインダー',
    CUSTOM: 'カスタム',
  };
  return labels[templateId] || templateId;
}

// 平均送信時間を計算する関数（仮の実装）
function getAverageSendingTime(stats: any): string {
  // 実際のデータから計算する必要があります
  return '1.2秒';
}

// エラー率の変化を計算する関数（仮の実装）
function getFailureRateChange(stats: any): string {
  // 実際のデータから計算する必要があります
  const previousRate = stats.failureRate * 1.1; // 仮の計算
  return ((stats.failureRate - previousRate) / previousRate * 100).toFixed(1);
} 