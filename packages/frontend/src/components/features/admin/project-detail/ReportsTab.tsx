"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Report } from "@/types/project";

interface ReportsTabProps {
  reports?: Report[];
}

export function ReportsTab({ reports }: ReportsTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'investigating':
        return 'bg-blue-500';
      case 'resolved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '審査待ち';
      case 'investigating':
        return '調査中';
      case 'resolved':
        return '解決済み';
      case 'rejected':
        return '却下';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>通報履歴</CardTitle>
        <CardDescription>このプロジェクトに関する通報履歴を表示します</CardDescription>
      </CardHeader>
      <CardContent>
        {reports?.length ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">
                        {report.reporter?.profile?.displayName || '不明なユーザー'}
                      </p>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.reporter?.id || '不明なID'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(report.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">理由: {report.reason}</p>
                  {report.comment && (
                    <p className="text-sm mt-1">コメント: {report.comment}</p>
                  )}
                  {report.adminComment && (
                    <p className="text-sm mt-1 text-muted-foreground">
                      管理者コメント: {report.adminComment}
                    </p>
                  )}
                </div>
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