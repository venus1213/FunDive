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
import type { Message } from "@/types/project";

interface MessagesTabProps {
  messages?: Message[];
}

export function MessagesTab({ messages }: MessagesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>メッセージ履歴</CardTitle>
        <CardDescription>このプロジェクトに関連するメッセージ履歴を表示します</CardDescription>
      </CardHeader>
      <CardContent>
        {messages?.length ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{message.sender?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {message.sender?.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            メッセージ履歴がありません
          </div>
        )}
      </CardContent>
    </Card>
  );
} 