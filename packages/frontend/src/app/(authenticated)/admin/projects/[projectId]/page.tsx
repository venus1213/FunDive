"use client";

import * as React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
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
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesTab } from "@/components/features/admin/project-detail/MessagesTab";
import { ReportsTab } from "@/components/features/admin/project-detail/ReportsTab";
import { Project } from "@/types/project";

export default function AdminProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const { toast } = useToast();
  const projectId = params.projectId as string;

  // プロジェクト詳細の取得
  const { data: project, isLoading, refetch } = useQuery<Project>({
    queryKey: ["adminProjectDetail", projectId],
    queryFn: async () => {
      const data = await adminApi.getProjectDetail(projectId);
      return data;
    },
    enabled: !!projectId && isAdmin,
  });

  // ステータス更新のミューテーション
  const statusMutation = useMutation({
    mutationFn: (status: 'active' | 'suspended' | 'draft') => adminApi.updateProjectStatus(projectId, { status }),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "プロジェクトのステータスを更新しました",
      });
      refetch();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ステータスの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  // 削除のミューテーション
  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteProject(projectId, { reason: "管理者による削除", confirm: true }),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "プロジェクトを削除しました",
      });
      router.push('/admin/projects');
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "プロジェクトの削除に失敗しました",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>読み込み中...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-muted-foreground">
          プロジェクトが見つかりません
        </div>
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
      case 'closed':
        return '終了';
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

  return (
    <div className="container py-8 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/projects" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">プロジェクト詳細（管理）</h1>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={project.status === 'active' ? "destructive" : "default"}>
                {project.status === 'active' ? (
                  <>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    停止する
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    公開する
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>プロジェクトのステータス変更</DialogTitle>
                <DialogDescription>
                  {project.status === 'active' 
                    ? 'このプロジェクトを停止しますか？'
                    : 'このプロジェクトを公開しますか？'
                  }
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant={project.status === 'active' ? "destructive" : "default"}
                  onClick={() => statusMutation.mutate(
                    project.status === 'active' ? 'suspended' : 'active'
                  )}
                  disabled={statusMutation.isPending}
                >
                  {project.status === 'active' ? '停止する' : '公開する'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">プロジェクトを削除</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>プロジェクトの削除</DialogTitle>
                <DialogDescription>
                  このアクションは取り消せません。本当にプロジェクトを削除しますか？
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  削除する
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* プロジェクト基本情報 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {getProjectTypeIcon()}
          <Badge className="text-md">{getProjectTypeText()}</Badge>
          <Badge className={getStatusBadgeColor()}>{getStatusText()}</Badge>
        </div>

        <h2 className="text-3xl font-bold">{project.title}</h2>

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

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">プロジェクト詳細</TabsTrigger>
          <TabsTrigger value="messages">メッセージ履歴</TabsTrigger>
          <TabsTrigger value="reports">通報管理</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
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
                      {project.investmentAmount?.toLocaleString() ?? '未設定'} 円
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
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">投資家数</p>
                    <p className="font-semibold text-muted-foreground">
                      準備中
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
                      href={`/admin/users/${project.user?.id}`}
                      className="hover:underline"
                    >
                      <p className="font-semibold">{project.user?.profile?.displayName}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <MessagesTab messages={project.messages} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab reports={project.reports} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 