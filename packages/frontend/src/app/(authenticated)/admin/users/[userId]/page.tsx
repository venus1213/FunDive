"use client";

import * as React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, UserX, UserCheck, UserCog, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileTab } from "@/components/features/admin/user-detail/ProfileTab";
import { ActivityTab } from "@/components/features/admin/user-detail/ActivityTab";
import { ProjectsTab } from "@/components/features/admin/user-detail/ProjectsTab";
import { ReportsTab } from "@/components/features/admin/user-detail/ReportsTab";

interface UserDetail {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: {
    displayName: string | null;
    company: string | null;
    position: string | null;
    location: string | null;
    bio: string | null;
  } | null;
  activityLogs: { // 修正
    id: string;
    actionType: string;
    targetType: string;
    targetId?: string;
    details: Record<string, any>;
    createdAt: string;
    ipAddress?: string;
    userAgent?: string;
  }[]; // undefinedを許可しない
  projects: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }[];
  reports: {
    id: string;
    targetType: 'user' | 'project' | 'message';
    targetId: string;
    reason: 'spam' | 'inappropriate_content' | 'harassment' | 'scam' | 'other';
    status: 'pending' | 'investigating' | 'resolved' | 'rejected';
    comment: string | null;
    adminComment: string | null;
    createdAt: string;
  }[];
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const { toast } = useToast();
  const userId = params.userId as string;

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["adminUserDetail", userId],
    queryFn: async () => {
      const userData = await adminApi.getUserDetail(userId);
      return userData as unknown as UserDetail;
    },
    enabled: !!userId && isAdmin,
  });

  // ステータス更新のミューテーション
  const statusMutation = useMutation({
    mutationFn: (isVerified: boolean) => adminApi.updateUserStatus(userId, isVerified),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "ユーザーのステータスを更新しました",
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

  // ロール更新のミューテーション
  const roleMutation = useMutation({
    mutationFn: (role: string) => adminApi.updateUserRole(userId, { role: role as any }),
    onSuccess: () => {
      toast({
        title: "更新完了",
        description: "ユーザーのロールを更新しました",
      });
      refetch();
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ロールの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  // 削除のミューテーション
  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteUser(userId, { reason: "管理者による削除", confirm: true }),
    onSuccess: () => {
      toast({
        title: "削除完了",
        description: "ユーザーを削除しました",
      });
      router.push('/admin/users');
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "ユーザーの削除に失敗しました",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-muted-foreground">
          ユーザーが見つかりません
        </div>
      </div>
    );
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
          <h1 className="text-2xl font-bold">ユーザー詳細</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => statusMutation.mutate(!user.isVerified)}
            disabled={statusMutation.isPending}
          >
            {user.isVerified ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                認証解除
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                認証する
              </>
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserCog className="mr-2 h-4 w-4" />
                ロール変更
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ロール変更</DialogTitle>
                <DialogDescription>
                  ユーザーのロールを変更します
                </DialogDescription>
              </DialogHeader>
              <Select
                defaultValue={user.role}
                onValueChange={(value) => roleMutation.mutate(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ロールを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrepreneur">起業家</SelectItem>
                  <SelectItem value="investor">投資家</SelectItem>
                  <SelectItem value="admin">管理者</SelectItem>
                  <SelectItem value="invited">招待者</SelectItem>
                </SelectContent>
              </Select>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                削除
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ユーザーの削除</DialogTitle>
                <DialogDescription>
                  このアクションは取り消せません。本当にユーザーを削除しますか？
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

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="activity">アクティビティ</TabsTrigger>
          <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          <TabsTrigger value="reports">通報</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab user={user} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab activityLogs={user.activityLogs} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsTab projects={user.projects} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab reports={user.reports} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 