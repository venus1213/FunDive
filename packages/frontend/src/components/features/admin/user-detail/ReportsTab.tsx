"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  targetType: 'user' | 'project' | 'message';
  targetId: string;
  reason: 'spam' | 'inappropriate_content' | 'harassment' | 'scam' | 'other';
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  comment: string | null;
  adminComment: string | null;
  createdAt: string;
}

function formatReportReason(reason: string): string {
  const reasons: Record<string, string> = {
    spam: 'スパム',
    inappropriate_content: '不適切なコンテンツ',
    harassment: 'ハラスメント',
    scam: '詐欺',
    other: 'その他',
  };
  return reasons[reason] || reason;
}

function formatReportStatus(status: string): string {
  const statuses: Record<string, string> = {
    pending: '審査待ち',
    investigating: '調査中',
    resolved: '解決済み',
    rejected: '却下',
  };
  return statuses[status] || status;
}

export function ReportsTab({ reports }: { reports: Report[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>通報履歴</CardTitle>
        <CardDescription>このユーザーに関する通報履歴を表示します</CardDescription>
      </CardHeader>
      <CardContent>
        {reports?.length ? (
          <div className="space-y-4">
            {reports.map((report: Report) => (
              <div key={report.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">
                      {report.targetType === 'user' ? 'ユーザー' :
                       report.targetType === 'project' ? 'プロジェクト' : 'メッセージ'}
                      への通報
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {new Date(report.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className={cn(
                    "px-2 py-1 text-xs rounded",
                    report.status === 'resolved' ? "bg-green-100 text-green-800" :
                    report.status === 'rejected' ? "bg-red-100 text-red-800" :
                    report.status === 'investigating' ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  )}>
                    {formatReportStatus(report.status)}
                  </div>
                </div>
                <div className="text-sm mb-2">
                  <span className="text-muted-foreground">理由: </span>
                  {formatReportReason(report.reason)}
                </div>
                {report.comment && (
                  <div className="text-sm mb-2">
                    <span className="text-muted-foreground">コメント: </span>
                    {report.comment}
                  </div>
                )}
                {report.adminComment && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">管理者コメント: </span>
                    {report.adminComment}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            通報履歴がありません
          </div>
        )}
      </CardContent>
    </Card>
  );
} 