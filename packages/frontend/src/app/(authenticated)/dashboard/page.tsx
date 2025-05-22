"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Rocket,
  Bookmark,
  Bell,
  ListChecks,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { dashboardApi } from "@/lib/api";
import Link from "next/link";
import { OnboardingProvider, OnboardingTaskList } from "@/components/features/onboarding/OnboardingProvider";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  totalProjects: number;
  unreadMessages: number;
  bookmarkCount: number;
  notifications: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }>;
  recentMessages: Array<{
    id: string;
    content: string;
    sender: {
      name: string;
    };
    createdAt: string;
  }>;
  popularProjects: Array<{
    id: string;
    userId: string;
    title: string;
    description: string;
    category: string;
    projectType: string;
    status: string;
    investmentAmount: number | null;
    location: string | null;
    projectStage: string | null;
    popularityScore: number;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    _count: {
      bookmarks: number;
      messages: number;
    }
  }>;
}

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guideHidden, setGuideHidden] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await dashboardApi.getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('統計情報の取得に失敗しました。しばらく経ってから再度お試しください。');
      } finally {
        setLoading(false);
      }
    };

    if (!isLoading && user) {
      fetchDashboardStats();
    }
  }, [isLoading, user]);

  const dashboardStats = [
    {
      title: "総プロジェクト数",
      value: loading ? <Skeleton className="h-7 w-16" /> : stats?.totalProjects ?? 0,
      icon: Rocket,
      description: "アクティブなプロジェクト",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "メッセージ",
      value: loading ? <Skeleton className="h-7 w-16" /> : stats?.unreadMessages ?? 0,
      icon: MessageSquare,
      description: "未読メッセージ",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "ブックマーク",
      value: loading ? <Skeleton className="h-7 w-16" /> : stats?.bookmarkCount ?? 0,
      icon: Bookmark,
      description: "保存したプロジェクト",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "新規通知",
      value: loading ? <Skeleton className="h-7 w-16" /> : stats?.notifications?.length ?? 0,
      icon: Bell,
      description: "未読の通知",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <OnboardingProvider>
      <div className="space-y-6 p-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              ようこそ、{user?.profile?.displayName || "ゲスト"}さん
            </h1>
            <p className="text-muted-foreground">
              あなたのプロジェクトとアクティビティの概要です
            </p>
          </div>
          
          {guideHidden && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('hideCompletedStartupGuide', 'false');
                  setGuideHidden(false);
                }
              }}
            >
              <ListChecks className="h-4 w-4" />
              スタートアップガイドを表示
            </Button>
          )}
        </div>

        {!guideHidden && (
          <OnboardingTaskList 
            className="w-full" 
            onHiddenChange={(hidden) => setGuideHidden(hidden)}
          />
        )}

        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
          {dashboardStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>最近のアクティビティ</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {loading ? (
                    [1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-[60%]" />
                      </div>
                    ))
                  ) : (
                    stats?.notifications.map((notification) => (
                      <div key={notification.id} className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString('ja-JP')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>人気のプロジェクト</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats?.popularProjects.map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">
                            <Link href={`/projects/${project.id}`} className="hover:underline">
                              {project.title}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center space-x-1">
                              <Bookmark className="h-3 w-3 text-purple-500" />
                              <span className="text-xs text-muted-foreground">{project._count.bookmarks}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-muted-foreground">{project._count.messages}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{project.user.name}</span>
                          {project.location && (
                            <>
                              <span>•</span>
                              <span>{project.location}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{new Date(project.createdAt).toLocaleDateString('ja-JP')}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    ))}
                    {(!stats?.popularProjects || stats.popularProjects.length === 0) && (
                      <div className="text-center py-4 text-muted-foreground">
                        人気のプロジェクトはありません
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </OnboardingProvider>
  );
} 