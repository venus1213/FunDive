"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { notificationApi } from "@/lib/api/notification";
import { useNotificationStore } from "@/store/notification";
import { toast } from "sonner";
import type { Notification, NotificationsResponse } from "@/types/notification";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { setUnreadCount, decrementUnreadCount } = useNotificationStore();
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response: NotificationsResponse = await notificationApi.getNotifications({
        page,
        limit: ITEMS_PER_PAGE,
      });
      setNotifications(prevNotifications => 
        page === 1 ? response.notifications : [...prevNotifications, ...response.notifications]
      );
      setHasMore(page < response.pagination.totalPages);
      setUnreadCount(response.notifications.filter(n => !n.isRead).length);
    } catch (error) {
      toast.error('通知の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationApi.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      toast.success('既読にしました');
    } catch (error) {
      toast.error('通知の既読処理に失敗しました');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
      toast.success('全ての通知を既読にしました');
    } catch (error) {
      toast.error('全通知の既読処理に失敗しました');
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // 未読なら既読処理
      if (!notification.isRead) {
        await notificationApi.markAsRead(notification.id);
        setNotifications(prev => prev.map(n => (
          n.id === notification.id ? { ...n, isRead: true } : n
        )));
        decrementUnreadCount();
      }
    } catch (error) {
      // エラー時でも遷移は継続
      console.error('既読処理失敗:', error);
    }

    switch (notification.type) {
      case 'message_received':
        if (notification.title.includes('プロジェクト') || notification.content.includes('プロジェクト')) {
          router.push(`/projects/${notification.relatedId}`);
        } else {
          router.push(`/messages/direct/${notification.relatedId}`);
        }
        break;
      case 'project_bookmarked':
        router.push(`/projects/${notification.relatedId}`);
        break;
      case 'user_mentioned':
        router.push(`/projects/${notification.relatedId}`);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleMarkAllAsRead}
          disabled={!notifications.some(n => !n.isRead)}
        >
          全て既読にする
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              notification.isRead ? 'bg-background' : 'bg-muted'
            } cursor-pointer hover:bg-muted/80`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm">{notification.content}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted-foreground/10">
                    {notification.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                既読にする
              </Button>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && hasMore && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLoadMore}
          >
            もっと見る
          </Button>
        )}

        {!loading && notifications.length === 0 && (
          <div className="text-center p-4 text-muted-foreground">
            通知はありません
          </div>
        )}
      </div>
    </div>
  );
} 