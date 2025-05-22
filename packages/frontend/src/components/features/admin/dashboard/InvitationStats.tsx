import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '@/lib/api/admin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import * as React from "react";
interface InvitationStatsProps {
  period: number;
}

export function InvitationStats({ period }: InvitationStatsProps) {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['adminDashboard', period],
    queryFn: () => adminDashboardApi.getDashboardStats(Number(period)),
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

  const { invitationStats } = dashboardStats;

  return (
    <div className="space-y-6">
      {/* 招待コード概要 */}
      <Card>
        <CardHeader>
          <CardTitle>招待コード概要</CardTitle>
          <CardDescription>招待コードの全体統計</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold">{invitationStats.totalCodes}</div>
              <div className="text-sm text-muted-foreground">総コード数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{invitationStats.activeCodes}</div>
              <div className="text-sm text-muted-foreground">有効なコード</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{invitationStats.expiredCodes}</div>
              <div className="text-sm text-muted-foreground">期限切れ</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{invitationStats.usedCodes}</div>
              <div className="text-sm text-muted-foreground">使用済み</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-2xl font-bold">{invitationStats.usageRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">使用率</div>
          </div>
        </CardContent>
      </Card>

      {/* 使用状況の分析 */}
      <Card>
        <CardHeader>
          <CardTitle>使用状況の分析</CardTitle>
          <CardDescription>招待コードの使用傾向</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">有効コード率</div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(invitationStats.activeCodes / invitationStats.totalCodes) * 100}%`,
                  }}
                />
              </div>
              <div className="w-16 text-sm text-right">
                {((invitationStats.activeCodes / invitationStats.totalCodes) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">使用済み率</div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(invitationStats.usedCodes / invitationStats.totalCodes) * 100}%`,
                  }}
                />
              </div>
              <div className="w-16 text-sm text-right">
                {((invitationStats.usedCodes / invitationStats.totalCodes) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">期限切れ率</div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(invitationStats.expiredCodes / invitationStats.totalCodes) * 100}%`,
                  }}
                />
              </div>
              <div className="w-16 text-sm text-right">
                {((invitationStats.expiredCodes / invitationStats.totalCodes) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 最近の使用履歴 */}
      <Card>
        <CardHeader>
          <CardTitle>最近の使用履歴</CardTitle>
          <CardDescription>招待コードの使用状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invitationStats.recentUsage.map((usage) => (
              <div
                key={usage.code}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{usage.code}</div>
                  <div className="text-sm text-muted-foreground">
                    {usage.currentUses} / {usage.maxUses} 回使用
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div>
                    作成: {format(new Date(usage.createdAt), 'yyyy/MM/dd HH:mm', { locale: ja })}
                  </div>
                  <div>
                    最終使用: {format(new Date(usage.updatedAt), 'yyyy/MM/dd HH:mm', { locale: ja })}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(usage.currentUses / usage.maxUses) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 使用効率分析 */}
      <Card>
        <CardHeader>
          <CardTitle>使用効率分析</CardTitle>
          <CardDescription>招待コードの効率性指標</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">平均使用時間</h4>
              <div className="text-3xl font-bold text-primary">
                {getAverageUsageTime(invitationStats.recentUsage)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                コード発行から使用までの平均時間
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">使用効率</h4>
              <div className="text-3xl font-bold text-primary">
                {getUsageEfficiency(invitationStats)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                発行コードの実際の使用効率
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 平均使用時間を計算する関数（仮の実装）
function getAverageUsageTime(recentUsage: any[]): string {
  // 実際のデータから計算する必要があります
  return '2.5日';
}

// 使用効率を計算する関数（仮の実装）
function getUsageEfficiency(stats: any): string {
  const efficiency = (stats.usedCodes / (stats.totalCodes - stats.activeCodes)) * 100;
  return efficiency.toFixed(1);
} 