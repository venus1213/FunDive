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
import * as React from "react";
interface UserStatsProps {
  period: number;
}

export function UserStats({ period }: UserStatsProps) {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['adminDashboard', period],
    queryFn: () => adminDashboardApi.getDashboardStats(Number(period)),
  });

  const { data: timeSeriesStats } = useQuery({
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

  return (
    <div className="space-y-6">
      {/* ユーザー概要 */}
      <Card>
        <CardHeader>
          <CardTitle>ユーザー概要</CardTitle>
          <CardDescription>ユーザーの全体統計</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold">
                {dashboardStats.userStats.totalUsers}
              </div>
              <div className="text-sm text-muted-foreground">総ユーザー数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {dashboardStats.userStats.activeUsers}
              </div>
              <div className="text-sm text-muted-foreground">アクティブユーザー</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {dashboardStats.userStats.verifiedUsers}
              </div>
              <div className="text-sm text-muted-foreground">認証済みユーザー</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {dashboardStats.userStats.invitedUsers}
              </div>
              <div className="text-sm text-muted-foreground">招待中のユーザー</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <div className="text-2xl font-bold">
                {dashboardStats.userStats.activeUserRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">アクティブ率</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {dashboardStats.userStats.verificationRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">認証率</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* プラン別ユーザー数 */}
      <Card>
        <CardHeader>
          <CardTitle>プラン別ユーザー数</CardTitle>
          <CardDescription>各プランのユーザー数分布</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(dashboardStats.userStats.usersByPlan || {}).map(([planType, count]) => (
              <div key={planType} className="flex items-center gap-4">
                <div className="w-32 text-sm">{getPlanLabel(planType)}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(count / dashboardStats.userStats.totalUsers) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{count}人</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ユーザー登録推移 */}
      <Card>
        <CardHeader>
          <CardTitle>ユーザー登録推移</CardTitle>
          <CardDescription>期間中のユーザー登録数の推移</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSeriesStats?.userRegistration.map((data) => (
              <div key={data.createdAt} className="flex items-center gap-4">
                <div className="w-32 text-sm">
                  {new Date(data.createdAt).toLocaleDateString('ja-JP')}
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(data._count / Math.max(...timeSeriesStats.userRegistration.map(d => d._count))) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{data._count}人</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ロール別分布 */}
      <Card>
        <CardHeader>
          <CardTitle>ロール別分布</CardTitle>
          <CardDescription>ユーザーのロール別内訳</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(getRoleDistribution(dashboardStats.userStats)).map(([role, count]) => (
              <div key={role} className="flex items-center gap-4">
                <div className="w-32 text-sm">{getRoleLabel(role)}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(count / dashboardStats.userStats.totalUsers) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{count}人</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* アクティブユーザー分析 */}
      <Card>
        <CardHeader>
          <CardTitle>アクティブユーザー分析</CardTitle>
          <CardDescription>ユーザーのアクティビティ状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">アクティブ率の推移</h4>
              <div className="text-3xl font-bold text-primary">
                {dashboardStats.userStats.activeUserRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                前期比: {getActiveRateChange(dashboardStats.userStats)}%
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">認証率の推移</h4>
              <div className="text-3xl font-bold text-primary">
                {dashboardStats.userStats.verificationRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                前期比: {getVerificationRateChange(dashboardStats.userStats)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ロールのラベルを取得する関数
function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    entrepreneur: '起業家',
    investor: '投資家',
    admin: '管理者',
    invited: '招待中',
  };
  return labels[role] || role;
}

// ロール別分布を計算する関数（仮のデータ）
function getRoleDistribution(userStats: any) {
  // 実際のAPIからロール別データを取得する必要があります
  return {
    entrepreneur: Math.floor(userStats.totalUsers * 0.6),
    investor: Math.floor(userStats.totalUsers * 0.3),
    admin: Math.floor(userStats.totalUsers * 0.05),
    invited: userStats.invitedUsers,
  };
}

// アクティブ率の変化を計算する関数（仮の実装）
function getActiveRateChange(userStats: any) {
  // 実際のAPIから前期のデータを取得する必要があります
  const previousRate = userStats.activeUserRate * 0.9; // 仮の計算
  return ((userStats.activeUserRate - previousRate) / previousRate * 100).toFixed(1);
}

// 認証率の変化を計算する関数（仮の実装）
function getVerificationRateChange(userStats: any) {
  // 実際のAPIから前期のデータを取得する必要があります
  const previousRate = userStats.verificationRate * 0.95; // 仮の計算
  return ((userStats.verificationRate - previousRate) / previousRate * 100).toFixed(1);
}

// プラン名を日本語で表示するヘルパー関数
function getPlanLabel(planType: string): string {
  const planLabels: Record<string, string> = {
    'free': '無料プラン',
    'standard': 'スタンダードプラン',
    'premium': 'プレミアムプラン',
    'startup_partner': 'スタートアップパートナー',
  };
  
  return planLabels[planType] || planType;
} 