"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { projectApi } from "@/lib/api/project";
import { bookmarkApi } from "@/lib/api/bookmark";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  Rocket,
  Coins,
  HandshakeIcon,
  Users,
  Building2,
  Target,
  Hourglass,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { ProjectMessages } from "./ProjectMessages";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectDetailProps {
  projectId: string;
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuthStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectApi.getProject(projectId);
        setProject(response);
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "プロジェクトの取得に失敗しました。",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, toast]);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">プロジェクトが見つかりません</h2>
        <Button asChild className="mt-4">
          <Link href="/projects">プロジェクト一覧に戻る</Link>
        </Button>
      </div>
    );
  }

  const getProjectTypeIcon = () => {
    switch (project.projectType) {
      case 'entrepreneur':
        return <Rocket className="h-5 w-5 text-blue-500" />;
      case 'investor':
        return <Coins className="h-5 w-5 text-purple-500" />;
      case 'cofounder':
        return <HandshakeIcon className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getProjectTypeText = () => {
    switch (project.projectType) {
      case 'entrepreneur':
        return '起業プロジェクト';
      case 'investor':
        return '投資プロジェクト';
      case 'cofounder':
        return '共同創業者募集';
      default:
        return project.projectType;
    }
  };

  const getCategoryText = () => {
    switch (project.category) {
      case 'tech':
        return 'テクノロジー';
      case 'finance':
        return '金融';
      case 'retail':
        return '小売';
      case 'healthcare':
        return 'ヘルスケア';
      case 'education':
        return '教育';
      case 'other':
        return 'その他';
      default:
        return project.category;
    }
  };

  const getStatusBadgeColor = () => {
    switch (project.status) {
      case 'draft':
        return 'bg-gray-500';
      case 'active':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      case 'suspended':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (project.status) {
      case 'draft':
        return '下書き';
      case 'active':
        return '公開中';
      case 'suspended':
        return '一時停止';
      default:
        return project.status;
    }
  };

  const getProjectStageText = () => {
    switch (project.projectStage) {
      case 'idea':
        return 'アイデア段階';
      case 'mvp':
        return 'MVP/プロトタイプ';
      case 'early_stage':
        return 'アーリーステージ';
      case 'growth':
        return '成長段階';
      case 'mature':
        return '成熟段階';
      default:
        return '未設定';
    }
  };

  const isOwner = user?.id === project.userId;

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    try {
      await projectApi.deleteProject(projectId);
      toast({
        title: "プロジェクトを削除しました",
      });
      router.push("/projects");
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "プロジェクトの削除に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast({
        title: "ログインが必要です",
        description: "ブックマーク機能を利用するにはログインが必要です。",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsBookmarkLoading(true);
      if (project?.isBookmarked) {
        await bookmarkApi.removeBookmark(projectId);
        setProject(prev => prev ? {
          ...prev,
          isBookmarked: false,
          bookmarkCount: (prev.bookmarkCount || 0) - 1
        } : null);
        toast({
          title: "ブックマークを解除しました",
        });
      } else {
        await bookmarkApi.addBookmark(projectId);
        setProject(prev => prev ? {
          ...prev,
          isBookmarked: true,
          bookmarkCount: (prev.bookmarkCount || 0) + 1
        } : null);
        toast({
          title: "ブックマークに追加しました",
        });
      }
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "ブックマーク操作に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href={isOwner ? "/projects/my" : "/projects/search"} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </Button>
      </div>

      {/* プロジェクト基本情報 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {getProjectTypeIcon()}
            <Badge className="text-md">{getProjectTypeText()}</Badge>
            <Badge className={getStatusBadgeColor()}>{getStatusText()}</Badge>
          </div>
          {isOwner ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {project.bookmarkCount ?? 0} 件のブックマーク
              </span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmarkToggle}
              disabled={isBookmarkLoading}
              className="gap-2"
            >
              {isBookmarkLoading ? (
                "処理中..."
              ) : (
                <>
                  {project?.isBookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4" />
                      <span>ブックマーク済み</span>
                      {(project?.bookmarkCount ?? 0) > 0 && (
                        <span className="text-sm text-muted-foreground">({project.bookmarkCount})</span>
                      )}
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      <span>ブックマーク</span>
                      {(project?.bookmarkCount ?? 0) > 0 && (
                        <span className="text-sm text-muted-foreground">({project.bookmarkCount})</span>
                      )}
                    </>
                  )}
                </>
              )}
            </Button>
          )}
        </div>

        <h1 className="text-3xl font-bold">{project.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-emerald-500" />
            <span>作成日: {formatDate(project.createdAt)}</span>
          </div>
          {project.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>{project.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-amber-500" />
            <span>{getCategoryText()}</span>
          </div>
          {project.projectStage && (
            <div className="flex items-center gap-1">
              <Hourglass className="h-4 w-4 text-purple-500" />
              <span>{getProjectStageText()}</span>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* タブ切り替え */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="details">プロジェクト詳細</TabsTrigger>
            <TabsTrigger value="messages">メッセージ</TabsTrigger>
          </TabsList>

          {isOwner && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href={`/projects/${project.id}/edit`}>
                  プロジェクトを編集
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">プロジェクトを削除</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は取り消すことができません。プロジェクトに関連するすべての情報が削除されます。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteProject}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "削除中..." : "削除する"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <TabsContent value="details" className="space-y-6">
          <div className="space-y-6">
            {/* 目標と進捗 */}
            <Card>
              <CardHeader>
                <CardTitle>目標と進捗</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">目標金額</p>
                      <p className="font-semibold">
                        {project.investmentAmount
                          ? project.investmentAmount >= 100000000
                            ? `${(project.investmentAmount / 100000000).toFixed(1)}億円`
                            : `${(project.investmentAmount / 10000).toFixed(0)}万円`
                          : "未設定"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">現在の金額</p>
                      <p className="font-semibold text-muted-foreground">
                        準備中
                      </p>
                      <p className="text-sm text-muted-foreground text-red-300">
                        ※ FUNDIVEのアップデートをお待ちください。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">投資家数</p>
                      <p className="font-semibold text-muted-foreground">
                        準備中
                      </p>
                      <p className="text-sm text-muted-foreground text-red-300">
                        ※ FUNDIVEのアップデートをお待ちください。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 説明 */}
            <Card>
              <CardHeader>
                <CardTitle>プロジェクト概要</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{project.description}</p>
              </CardContent>
            </Card>

            {/* プロジェクトオーナー情報 */}
            <Card>
              <CardHeader>
                <CardTitle>プロジェクトオーナー</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Link
                        href={`/users/${project.user?.id}`}
                        className="hover:underline"
                      >
                        <p className="font-semibold">{project.user?.profile?.displayName}</p>
                      </Link>
                    </div>
                  </div>
                  {project.user?.socialLinks && (
                    <div className="flex items-center gap-2 pt-2 border-t">
                      {project.user.socialLinks.twitter && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {project.user.socialLinks.facebook && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )}
                      {project.user.socialLinks.linkedin && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {project.user.socialLinks.github && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <ProjectMessages projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 