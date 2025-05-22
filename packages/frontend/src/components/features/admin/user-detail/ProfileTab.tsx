"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfile {
  displayName: string | null;
  company: string | null;
  position: string | null;
  location: string | null;
  bio: string | null;
}

interface User {
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile | null;
}

export function ProfileTab({ user }: { user: User }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
          <CardDescription>ユーザーの基本情報を表示します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">メールアドレス</div>
              <div>{user?.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">名前</div>
              <div>{user?.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">ロール</div>
              <div>{user?.role}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">認証状態</div>
              <div className={user?.isVerified ? "text-green-600" : "text-red-600"}>
                {user?.isVerified ? "認証済み" : "未認証"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">登録日</div>
              <div>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">最終更新日</div>
              <div>{user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : '-'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {user?.profile && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>プロフィール情報</CardTitle>
            <CardDescription>詳細なプロフィール情報を表示します</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">表示名</div>
                <div>{user.profile.displayName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">会社名</div>
                <div>{user.profile.company || "未設定"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">役職</div>
                <div>{user.profile.position || "未設定"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">所在地</div>
                <div>{user.profile.location || "未設定"}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">自己紹介</div>
              <div className="whitespace-pre-wrap">{user.profile.bio || "未設定"}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 