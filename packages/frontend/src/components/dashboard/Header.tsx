"use client";

import * as React from "react";
import { Bell, User, CreditCard, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { useEffect, useCallback, useRef } from "react";
import { api } from "@/lib/api";
import { useNotificationStore } from "@/store/notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Link from "next/link";
import { toast } from "sonner";

interface NotificationResponse {
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

// 設定値
const POLLING_INTERVAL = 5 * 60 * 1000; // 5分
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function Header() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { unreadCount, setUnreadCount } = useNotificationStore();
  const retryCount = useRef(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await api.get<NotificationResponse>('/notifications', {
        params: {
          is_read: false,
          limit: 1
        }
      });
      setUnreadCount(response.data.pagination.total);
      retryCount.current = 0; // 成功したらリトライカウントをリセット
    } catch (error) {
      // リトライ処理
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        setTimeout(fetchUnreadCount, RETRY_DELAY * retryCount.current);
      }
    }
  }, [setUnreadCount]);

  useEffect(() => {
    if (!user) return;

    // ページがアクティブな時のみポーリングを実行
    let intervalId: NodeJS.Timeout | null = null;

    const startPolling = () => {
      fetchUnreadCount();
      intervalId = setInterval(fetchUnreadCount, POLLING_INTERVAL);
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // ページの表示状態の監視
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    // イベントリスナーの設定
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 初回実行
    startPolling();

    // クリーンアップ
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopPolling();
    };
  }, [user, fetchUnreadCount]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      toast.error("ログアウトに失敗しました。再度お試しください。");
    }
  };

  return (
    <div className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-destructive">
            FUNDIVE
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-yellow-500" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  alt={user?.profile?.name || ""}
                />
                <AvatarFallback>
                  {user?.profile?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.profile?.name || "ユーザー"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 text-blue-500" />
                プロフィール
              </DropdownMenuItem>
            </Link>
            <Link href="/settings/billing">
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4 text-emerald-500" />
                課金管理
              </DropdownMenuItem>
            </Link>
            <Link href="/settings/invitation">
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4 text-orange-500" />
                招待コード
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}