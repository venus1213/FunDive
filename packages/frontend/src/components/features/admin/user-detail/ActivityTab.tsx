"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityLog {
  id: string;
  actionType: string;
  targetType: string;
  targetId?: string;
  details: Record<string, any>;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
}

function formatActionType(actionType: string): string {
  const actionTypes: Record<string, string> = {
    login: 'ログイン',
    logout: 'ログアウト',
    create: '作成',
    update: '更新',
    delete: '削除',
    report: '通報',
    admin_action: '管理者アクション',
  };
  return actionTypes[actionType] || actionType;
}

function formatDetails(details: Record<string, any>): string {
  try {
    if (!details) return '';
    
    if (details.action === 'update_role') {
      return `ロールを ${details.previousRole} から ${details.newRole} に変更`;
    }
    if (details.action === 'update_status') {
      return `認証状態を ${details.isVerified ? '認証済み' : '未認証'} に変更`;
    }
    if (details.action === 'delete_user') {
      return `ユーザーを削除 (理由: ${details.reason})`;
    }
    
    return Object.entries(details)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  } catch (error) {
    return JSON.stringify(details);
  }
}

export function ActivityTab({ activityLogs }: { activityLogs: ActivityLog[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>アクティビティ履歴</CardTitle>
        <CardDescription>ユーザーの最近のアクティビティを表示します</CardDescription>
      </CardHeader>
      <CardContent>
        {activityLogs?.length ? (
          <div className="space-y-4">
            {activityLogs.map((log: ActivityLog) => (
              <div key={log.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-32">
                  <div className="text-sm text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="font-medium">
                    {formatActionType(log.actionType)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDetails(log.details)}
                  </div>
                  {log.ipAddress && (
                    <div className="text-xs text-muted-foreground mt-1">
                      IP: {log.ipAddress}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            アクティビティ履歴がありません
          </div>
        )}
      </CardContent>
    </Card>
  );
} 