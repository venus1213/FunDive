'use client';

import * as React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '@/lib/api/admin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, RefreshCw } from 'lucide-react';
import { ProjectStats } from '@/components/features/admin/dashboard/ProjectStats';
import { UserStats } from '@/components/features/admin/dashboard/UserStats';
import { InvitationStats } from '@/components/features/admin/dashboard/InvitationStats';
import { EmailStats } from '@/components/features/admin/dashboard/EmailStats';
import { ErrorStats } from '@/components/features/admin/dashboard/ErrorStats';
export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [period, setPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  const {
    data: dashboardStats,
    isLoading: isLoadingStats,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['adminDashboard', period],
    queryFn: () => adminDashboardApi.getDashboardStats(Number(period)),
  });

  const handleRefresh = async () => {
    try {
      await adminDashboardApi.clearCache(Number(period));
      await refetchStats();
      toast({
        title: 'データを更新しました',
      });
    } catch (error) {
      toast({
        title: 'データの更新に失敗しました',
        variant: 'destructive',
      });
    }
  };

  if (isLoadingStats) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">管理者ダッシュボード</h1>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="期間を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7日間</SelectItem>
              <SelectItem value="30">30日間</SelectItem>
              <SelectItem value="90">90日間</SelectItem>
              <SelectItem value="180">180日間</SelectItem>
              <SelectItem value="365">365日間</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="users">ユーザー</TabsTrigger>
          <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          <TabsTrigger value="invitations">招待コード</TabsTrigger>
          <TabsTrigger value="emails">メール</TabsTrigger>
          <TabsTrigger value="errors">エラー</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* ユーザー統計 */}
          <Card>
            <CardHeader>
              <CardTitle>ユーザー統計</CardTitle>
              <CardDescription>ユーザーの登録状況と活動状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.userStats.totalUsers}
                  </div>
                  <div className="text-sm text-muted-foreground">総ユーザー数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.userStats.activeUsers}
                  </div>
                  <div className="text-sm text-muted-foreground">アクティブユーザー</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.userStats.verifiedUsers}
                  </div>
                  <div className="text-sm text-muted-foreground">認証済みユーザー</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.userStats.invitedUsers}
                  </div>
                  <div className="text-sm text-muted-foreground">招待中のユーザー</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 招待コード統計 */}
          <Card>
            <CardHeader>
              <CardTitle>招待コード統計</CardTitle>
              <CardDescription>招待コードの使用状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.invitationStats.totalCodes}
                  </div>
                  <div className="text-sm text-muted-foreground">総コード数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.invitationStats.activeCodes}
                  </div>
                  <div className="text-sm text-muted-foreground">有効なコード</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.invitationStats.expiredCodes}
                  </div>
                  <div className="text-sm text-muted-foreground">期限切れ</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.invitationStats.usedCodes}
                  </div>
                  <div className="text-sm text-muted-foreground">使用済み</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* メール送信統計 */}
          <Card>
            <CardHeader>
              <CardTitle>メール送信統計</CardTitle>
              <CardDescription>メール送信の成功率と失敗率</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.emailStats.totalEmails}
                  </div>
                  <div className="text-sm text-muted-foreground">総送信数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.emailStats.successfulEmails}
                  </div>
                  <div className="text-sm text-muted-foreground">送信成功</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.emailStats.failedEmails}
                  </div>
                  <div className="text-sm text-muted-foreground">送信失敗</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.emailStats.successRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">成功率</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* エラー統計 */}
          <Card>
            <CardHeader>
              <CardTitle>エラー統計</CardTitle>
              <CardDescription>システムエラーの発生状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats?.errorStats.totalErrors}
                  </div>
                  <div className="text-sm text-muted-foreground">総エラー数</div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">最近のエラー</h4>
                  <div className="space-y-2">
                    {dashboardStats?.errorStats.recentErrors.slice(0, 3).map((error) => (
                      <div
                        key={error.id}
                        className="text-sm text-muted-foreground border rounded-md p-2"
                      >
                        <div className="font-medium">{error.type}</div>
                        <div className="text-xs">{error.error}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <UserStats period={Number(period)} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectStats period={Number(period)} />
        </TabsContent>
        
        <TabsContent value="invitations">
          <InvitationStats period={Number(period)} />
        </TabsContent>

        <TabsContent value="emails">
          <EmailStats period={Number(period)} />
        </TabsContent>

        {/* 他のタブコンテンツは後で実装 */}
        <TabsContent value="errors">
          <ErrorStats period={Number(period)} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 