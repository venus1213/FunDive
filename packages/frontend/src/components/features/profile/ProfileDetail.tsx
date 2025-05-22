"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileApi } from "@/lib/api/profile";
import { messageApi } from "@/lib/api/message";
import { projectApi } from "@/lib/api/project";
import { User } from "@/types/user";
import { Project } from "@/types/project";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, MapPin, X, Linkedin, Globe, ArrowLeft, MessageSquare, Twitter, Facebook, Github, Folder, Lock } from "lucide-react";
import Link from "next/link";
import { PLAN_NAMES_JA } from "@/constants/planFeatures";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFeatureAccess } from "@/store/featureAccess";

interface ProfileDetailProps {
  userId: string;
}

export function ProfileDetail({ userId }: ProfileDetailProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user: currentUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const { canUseFeature, fetchStatus, status } = useFeatureAccess();

  // プラン情報が未取得の場合にフェッチ
  useEffect(() => {
    if (!status) {
      fetchStatus();
    }
  }, [status, fetchStatus]);

  // SNS閲覧可否
  const canViewSNS = status ? canUseFeature('profileAccess.sns.viewable') : true;

  const handleSendMessage = async () => {
    if (!message.trim() || !user?.id) {
      return;
    }

    try {
      setIsSending(true);
      const params = {
        receiverId: user.id,
        receiverRole: user.role,
        content: message.trim()
      };

      await messageApi.sendDirectMessage(params);

      toast({
        title: "メッセージを送信しました",
        description: "相手に通知が送られます。",
      });
      setMessage("");
      
      setShowNavigationDialog(true);
    } catch (error: any) {
      console.error("送信エラー:", error);
      toast({
        title: "エラーが発生しました",
        description: error?.message || "メッセージの送信に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleNavigateToMessages = () => {
    if (!user?.id) return;
    router.push(`/messages/direct/${user.id}`);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getProfile(userId);
        setUser(data);
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "プロフィールの取得に失敗しました。",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId, toast]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!userId) return;
      
      try {
        setIsLoadingProjects(true);
        
        // 自分のプロフィールの場合はgetMyProjectsを使用
        if (currentUser?.id === userId) {
          const response = await projectApi.getMyProjects();
          // アクティブなプロジェクトのみをフィルタリング
          const activeProjects = response.projects.filter(project => project.status === 'active');
          setUserProjects(activeProjects);
        } else {
          // 他のユーザーのプロフィールの場合はuserIdでフィルタリング
          const response = await projectApi.getProjects({ userId });
          // ユーザーIDが一致し、かつアクティブなプロジェクトのみをフィルタリング
          const filteredProjects = response.projects.filter(
            project => project.userId === userId && project.status === 'active'
          );
          setUserProjects(filteredProjects);
        }
      } catch (error) {
        console.error("プロジェクト取得エラー:", error);
        toast({
          title: "エラーが発生しました",
          description: "プロジェクト一覧の取得に失敗しました。",
          variant: "destructive",
        });
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchUserProjects();
  }, [userId, currentUser?.id, toast]);

  const isOwnProfile = currentUser?.id === user?.id;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">ユーザーが見つかりません</h2>
        <Button variant="outline" onClick={() => router.back()}>
          前のページに戻る
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AlertDialog 
        open={showNavigationDialog} 
        onOpenChange={(open) => {
          setShowNavigationDialog(open);
          if (!open) {
            // ダイアログを閉じるときの処理
            setMessage("");  // メッセージ入力欄をクリア
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>メッセージを送信しました</AlertDialogTitle>
            <AlertDialogDescription>
              {user?.profile?.name || "相手"}とのメッセージ画面に移動しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>このまま続ける</AlertDialogCancel>
            <AlertDialogAction onClick={handleNavigateToMessages}>
              メッセージ画面へ移動
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
        {isOwnProfile && (
          <Button asChild>
            <Link href="/settings/profile">プロフィールを編集</Link>
          </Button>
        )}
      </div>

      {/* メインプロフィール */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {user.profile?.displayName || "名称未設定"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {user.role === "investor" ? "投資家" : "起業家"}
                    </Badge>
                    {user.planType === 'premium' && (
                      <Badge variant="outline" className="bg-primary/10">
                        {PLAN_NAMES_JA[user.planType]}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* 会社・役職情報 */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-1.5 flex-shrink-0 text-orange-500" />
                  <span>
                    {user.profile?.company ? (
                      <>
                        {user.profile.company}
                        {user.profile.position && ` - ${user.profile.position}`}
                      </>
                    ) : (
                      <span className="text-muted-foreground/50 italic">会社情報：未設定</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-emerald-500" />
                  <span>
                    {user.profile?.location ? (
                      user.profile.location
                    ) : (
                      <span className="text-muted-foreground/50 italic">場所：未設定</span>
                    )}
                  </span>
                </div>
              </div>

              {/* SNS */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">SNS</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={canViewSNS ? (user.profile?.social_links?.twitter || "#") : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={user.profile?.social_links?.twitter && canViewSNS
                      ? 'text-blue-400 hover:text-primary transition-colors'
                      : 'text-muted-foreground/30 pointer-events-none'
                    }
                    onClick={(e) => (!user.profile?.social_links?.twitter || !canViewSNS) && e.preventDefault()}
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={canViewSNS ? (user.profile?.social_links?.facebook || "#") : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={user.profile?.social_links?.facebook && canViewSNS
                      ? 'text-blue-600 hover:text-primary transition-colors'
                      : 'text-muted-foreground/30 pointer-events-none'
                    }
                    onClick={(e) => (!user.profile?.social_links?.facebook || !canViewSNS) && e.preventDefault()}
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={canViewSNS ? (user.profile?.social_links?.linkedin || "#") : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={user.profile?.social_links?.linkedin && canViewSNS
                      ? 'text-blue-500 hover:text-primary transition-colors'
                      : 'text-muted-foreground/30 pointer-events-none'
                    }
                    onClick={(e) => (!user.profile?.social_links?.linkedin || !canViewSNS) && e.preventDefault()}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={canViewSNS ? (user.profile?.social_links?.github || "#") : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={user.profile?.social_links?.github && canViewSNS
                      ? 'text-gray-900 dark:text-white hover:text-primary transition-colors'
                      : 'text-muted-foreground/30 pointer-events-none'
                    }
                    onClick={(e) => (!user.profile?.social_links?.github || !canViewSNS) && e.preventDefault()}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {user.profile?.website && canViewSNS && (
                    <a
                      href={user.profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                  {!canViewSNS && (
                    <div className="ml-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3 inline-block mr-1" />
                      現在のプランではSNSリンクを閲覧できません
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 自己紹介 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">自己紹介</h3>
            {user.profile?.bio ? (
              <p className="text-muted-foreground whitespace-pre-wrap">{user.profile.bio}</p>
            ) : (
              <p className="text-muted-foreground/50 italic">自己紹介未設定</p>
            )}
          </div>

          {/* スキル */}
          <div>
            <h3 className="text-lg font-semibold mb-3">スキル</h3>
            {user.profile?.skills && user.profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground/50 italic">未設定</p>
            )}
          </div>

          {/* 興味関心 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {user.role === "investor" ? "投資関心領域" : "興味関心"}
            </h3>
            {user.profile?.interests && user.profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.profile.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground/50 italic">未設定</p>
            )}
          </div>

          {/* プロジェクト一覧 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">アクティブなプロジェクト</h3>
            {isLoadingProjects ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : userProjects.length > 0 ? (
              <div className="space-y-2">
                {userProjects.map((project) => (
                  <Link 
                    key={project.id} 
                    href={`/projects/${project.id}`}
                    className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <Folder className="h-4 w-4 mr-2 text-emerald-500" />
                    <span className="font-medium">{project.title}</span>
                    <Badge variant="outline" className="ml-auto">
                      進行中
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground/50 italic">アクティブなプロジェクトはありません</p>
            )}
          </div>

          {/* メッセージ送信 */}
          {!isOwnProfile && (
            <>
              {canUseFeature('messageAccess.direct.send', { targetUserType: user.role }) ? (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="text-lg font-semibold">メッセージを送る</h3>
                  <div className="space-y-2">
                    <Textarea
                      placeholder={`${user.profile?.name || "相手"}にメッセージを送る...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSending}
                        className="gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        送信
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">メッセージを送る</h3>
                    <Badge variant="outline" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      プレミアム機能
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder={`${user.profile?.name || "相手"}にメッセージを送るにはプランのアップグレードが必要です`}
                      disabled
                      className="min-h-[100px] bg-muted/50"
                    />
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        disabled
                        className="gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        送信
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-24 h-9" />
        <div className="w-40 h-9" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-7 w-32" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-7 w-32" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-28" />
              ))}
            </div>
          </div>

          {/* プロジェクト一覧のスケルトン */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-32" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 