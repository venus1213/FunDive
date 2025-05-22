"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { messageApi } from "@/lib/api/message";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@/types/profile";

interface Conversation {
  user: {
    id: string;
    name: string;
    email: string;
    profile?: Profile;
  };
  lastMessage: {
    id: string;
    content: string;
    createdAt: string;
    isRead: boolean;
    isSentByMe: boolean;
  };
  unreadCount: number;
}

export function DirectMessageList() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchConversations = async (pageNum: number = 1) => {
    try {
      const response = await messageApi.getDirectMessageConversations({ page: pageNum, limit: 10 });
      
      if (pageNum === 1) {
        setConversations(response.conversations);
      } else {
        setConversations(prev => [...prev, ...response.conversations]);
      }
      setHasMore(pageNum < response.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
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
    fetchConversations();
  }, []);

  const loadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchConversations(nextPage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mb-4" />
          <p>メッセージはありません</p>
        </div>
      ) : (
        <>
          {conversations.map((conversation) => (
            <div
              key={conversation.user.id}
              className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors relative"
            >
              <Link
                href={`/messages/direct/${conversation.user.id}`}
                className="absolute inset-0"
                aria-label="メッセージを開く"
              />
              <Avatar className="h-10 w-10 relative">
                <AvatarFallback>{conversation.user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="font-semibold line-clamp-1 relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/users/${conversation.user.id}`;
                        }}
                        className="hover:underline relative z-10"
                      >
                        {conversation.user.name}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {conversation.lastMessage.isSentByMe ? "あなた: " : ""}{conversation.lastMessage.content}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <time className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(conversation.lastMessage.createdAt)}
                    </time>
                    {conversation.unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full relative z-10">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
  );
} 