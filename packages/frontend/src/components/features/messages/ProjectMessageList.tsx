"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { projectApi } from "@/lib/api/project";
import Link from "next/link";
import { FeatureAccess } from "@/components/features/access/FeatureAccess";

interface ProjectMessage {
  id: string;
  projectId: string;
  projectTitle: string;
  lastMessage: {
    content: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
    };
  };
  unreadCount: number;
}

interface ProjectMessageResponse {
  myProjects: ProjectMessage[];
  otherProjects: ProjectMessage[];
  total: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function ProjectMessageList() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMessages = async (pageNum: number = 1) => {
    try {
      const response = await projectApi.getProjectMessageList(pageNum, 10);
      if (pageNum === 1) {
        setMessages([...response.myProjects, ...response.otherProjects]);
      } else {
        setMessages(prev => [...prev, ...response.myProjects, ...response.otherProjects]);
      }
      setHasMore(pageNum < response.pagination.totalPages);
    } catch (error) {

      toast({
        title: "エラー",
        description: "メッセージの取得に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const loadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchMessages(nextPage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <FeatureAccess feature="messageAccess.project.view">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mb-4" />
            <p>プロジェクトメッセージはありません</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Link
                key={message.id}
                href={`/projects/${message.projectId}`}
                className="block"
              >
                <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                  <MessageCircle className="h-5 w-5 mt-1 text-primary shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="font-semibold line-clamp-1">{message.projectTitle}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {message.lastMessage.sender.name}: {message.lastMessage.content}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <time className="text-sm text-muted-foreground whitespace-nowrap">
                          {formatDate(message.lastMessage.createdAt)}
                        </time>
                        {message.unreadCount > 0 && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                            {message.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="gap-2"
                >
                  {isLoadingMore ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "さらに読み込む"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </FeatureAccess>
  );
} 