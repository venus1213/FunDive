"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Send, UserRound } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { messageApi } from "@/lib/api/message";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { io, Socket } from "socket.io-client";
import { getAuth } from "firebase/auth";
import { PLAN_FEATURES } from "@/constants/planFeatures";
import { profileApi } from "@/lib/api/profile";
import { FeatureAccess } from "@/components/features/access/FeatureAccess";
import { User } from "@/types/user";

interface DirectMessagesProps {
  userId: string; // URLから受け取るユーザーID（userId）
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  isSentByMe: boolean;
  isRead: boolean;
  senderId?: string;
  sender: {
    id: string;
    role?: 'entrepreneur' | 'investor' | 'admin';
    profile?: {
      displayName?: string;
    };
  };
}

interface DirectMessageResponse {
  messages: Message[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// formatDateを相対時間表示に変更
const formatRelativeTime = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ja });
};

export function DirectMessages({ userId }: DirectMessagesProps) {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<Message['sender'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [displayLimit, setDisplayLimit] = useState<number>(PLAN_FEATURES.free.messageDisplayLimit);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [otherUserProfile, setOtherUserProfile] = useState<User | null>(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messageListRef.current) {
      setIsScrolledToTop(messageListRef.current.scrollTop === 0);
    }
  };

  const fetchMessages = useCallback(async (pageNum: number = 1) => {
    if (!userId) {
      setError('ユーザーIDが指定されていません');
      return;
    }

    if (!user?.id) {
      setError('認証が必要です');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // 相手のユーザー情報を取得
      try {
        const otherUserProfile = await profileApi.getProfile(userId);
        setOtherUserProfile(otherUserProfile);
        // otherUserの状態も更新
        setOtherUser({
          id: otherUserProfile.id,
          role: otherUserProfile.role as 'entrepreneur' | 'investor' | 'admin',
          profile: {
            displayName: otherUserProfile.profile?.displayName || 'ユーザー'
          }
        });
      } catch (error) {
        console.error('プロフィール取得エラー:', error);
        toast({
          title: "ユーザー情報の取得に失敗しました",
          description: "ユーザーが存在しないか、アクセス権限がありません。",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const response = await messageApi.getDirectMessages(userId, {
        page: pageNum,
        limit: 10
      });
      
      if (!response || !response.messages) {
        throw new Error('メッセージの取得に失敗しました');
      }

      const messageArray = response.messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        senderId: msg.sender.id,
        isSentByMe: msg.sender.id === user?.id,
        isRead: msg.isRead,
        sender: {
          id: msg.sender.id,
          role: msg.sender.id === user?.id ? user?.role : otherUserProfile?.role,
          profile: {
            displayName: msg.sender.id === user?.id
              ? user?.profile?.displayName 
              : otherUserProfile?.profile?.displayName || 'ユーザー'
          }
        }
      })).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      

      // プランに基づいて表示件数を制限
      let limit = PLAN_FEATURES.free.messageDisplayLimit;
      
      if (user?.isAdmin) {
        limit = 999999;
      } else if (user?.invitationExpires && new Date(user.invitationExpires) > new Date()) {
        limit = PLAN_FEATURES.premium.messageDisplayLimit;
      } else if (user?.planType) {
        limit = PLAN_FEATURES[user.planType].messageDisplayLimit;
      }
      
      setDisplayLimit(limit);
      
      const limitedMessages = messageArray.slice(-limit);
      setMessages(limitedMessages as Message[]);
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      setError('メッセージの取得に失敗しました。再度お試しください。');
      toast({
        title: "エラーが発生しました",
        description: "メッセージの取得に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  }, [userId, user?.id, toast]);

  useEffect(() => {
    if (userId && user?.id) {
      fetchMessages(1);
    }
  }, [userId, user?.id, fetchMessages]);

  useEffect(() => {
    // userとuserIdが両方存在する場合のみ接続を試みる
    if (!user?.id || !userId) {
      return;
    }

    let isSubscribed = true;

    try {
      // 既存の接続を切断
      if (socketRef.current) {
        const chatRoomId = [user.id, userId].sort().join(':');
        socketRef.current.off(`chat:${chatRoomId}`);
        socketRef.current.off('connect');
        socketRef.current.off('connect_error');
        socketRef.current.off('disconnect');
        socketRef.current.off('error');
        
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      const setupSocket = async () => {
        if (!isSubscribed) return;

        try {
          const auth = getAuth();
          const currentUser = auth.currentUser;
          if (!currentUser) {
            return;
          }

          const token = await currentUser.getIdToken();
          if (!isSubscribed) return;
          
          const chatRoomId = [user.id, userId].sort().join(':');
          
          socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
            withCredentials: true,
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            path: '/socket.io',
            auth: {
              token,
              type: 'firebase',
              userId: user.id
            }
          });

          if (!isSubscribed) {
            socketRef.current.disconnect();
            socketRef.current = null;
            return;
          }

          socketRef.current.once('connect', () => {
            if (!isSubscribed) return;
            
            socketRef.current?.emit("join-direct-chat", {
              roomId: chatRoomId,
              userId: user.id,
              otherUserId: userId
            });
          });

          socketRef.current.on('connect_error', (error: Error) => {
            if (!isSubscribed) return;
            
            toast({
              title: "接続エラー",
              description: "メッセージサーバーへの接続に失敗しました。",
              variant: "destructive",
            });
          });

          const handleNewMessage = (newMessageData: {
            id: string;
            content: string;
            createdAt: string;
            senderId: string;
            receiverId: string;
          }) => {
            if (!isSubscribed) return;
            
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(msg => msg.id === newMessageData.id);
              
              if (isDuplicate) {
                return prevMessages;
              }

              // 新しいメッセージオブジェクトを作成
              const newMessage: Message = {
                id: newMessageData.id,
                content: newMessageData.content,
                createdAt: newMessageData.createdAt,
                isSentByMe: newMessageData.senderId === user?.id,
                isRead: false,
                sender: {
                  id: newMessageData.senderId === user?.id ? user?.id : otherUser?.id || '',
                  profile: {
                    displayName: newMessageData.senderId === user?.id 
                      ? user.profile?.displayName 
                      : otherUser?.profile?.displayName
                  }
                }
              };
              
              const updatedMessages = [...prevMessages, newMessage];
              // 自分が送信したメッセージの場合のみスクロール
              if (newMessage.isSentByMe && shouldScrollToBottom) {
                setTimeout(scrollToBottom, 100);
              }
              return updatedMessages;
            });

            // 既読状態を更新
            if (newMessageData.senderId !== user?.id) {
              const chatRoomId = [user?.id, userId].sort().join(':');
              socketRef.current?.emit('message-read', {
                messageId: newMessageData.id,
                roomId: chatRoomId,
                userId: user?.id
              });
            }
          };
          // メッセージ受信イベントを登録（イベント名を修正）
          socketRef.current.on('new-direct-message', handleNewMessage);

          // メッセージ送信成功イベントを追加
          socketRef.current.on('message-sent', (data) => {
          });

          // メッセージ既読イベントを追加
          socketRef.current.on('message-read', (data) => {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === data.messageId ? { ...msg, isRead: true } : msg
              )
            );
          });

          socketRef.current.on('disconnect', () => {
            if (!isSubscribed) return;
            
          });

          socketRef.current.on('error', (error: Error) => {
            if (!isSubscribed) return;
            
          });

        } catch (error) {
          if (!isSubscribed) return;
          
          toast({
            title: "エラー",
            description: "WebSocket接続の設定に失敗しました。",
            variant: "destructive",
          });
        }
      };

      setupSocket();

      return () => {
        isSubscribed = false; // クリーンアップ時にフラグを更新
        
        if (socketRef.current) {
          const chatRoomId = [user.id, userId].sort().join(':');
          // イベントリスナーを全て削除
          socketRef.current.off(`chat:${chatRoomId}`);
          socketRef.current.off('connect');
          socketRef.current.off('connect_error');
          socketRef.current.off('disconnect');
          socketRef.current.off('error');
          
          socketRef.current.emit("leave-direct-chat", {
            roomId: chatRoomId,
            userId: user.id,
            otherUserId: userId
          });
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    } catch (error) {
      if (!isSubscribed) return;
      
      toast({
        title: "エラー",
        description: "WebSocket接続の設定に失敗しました。",
        variant: "destructive",
      });
    }
  }, [userId]); // userを依存配列から削除

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending || !userId || !otherUserProfile) {
      return;
    }

    setIsSending(true);
    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      // メンション検出
      const memberName = otherUserProfile.profile?.displayName || otherUserProfile.name || '';
      const mentionedUserIds: string[] = [];
      const mentionRegex = new RegExp(`@${memberName}(?:\\s|$)`);
      if (mentionRegex.test(messageContent)) {
        mentionedUserIds.push(otherUserProfile.id);
      }

      const response = await messageApi.sendDirectMessage({
        receiverId: userId,
        receiverRole: otherUserProfile.role || 'entrepreneur',
        content: messageContent,
        mentionedUserIds
      }) as { id: string };
      
      const newMessageObj: Message = {
        id: response.id,
        content: messageContent,
        createdAt: new Date().toISOString(),
        senderId: user?.id,
        isSentByMe: true,
        isRead: false,
        sender: {
          id: user?.id || '',
          role: user?.role as 'entrepreneur' | 'investor' | 'admin',
          profile: {
            displayName: user?.profile?.displayName || 'あなた'
          }
        }
      };

      const chatRoomId = [user?.id, userId].sort().join(':');
      
      socketRef.current?.emit('send-direct-message', {
        roomId: chatRoomId,
        message: {
          id: newMessageObj.id,
          content: messageContent,
          senderId: user?.id,
          receiverId: userId,
          createdAt: new Date().toISOString()
        }
      });

      setMessages(prev => [...prev, newMessageObj]);
      setShouldScrollToBottom(true);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "メッセージの送信に失敗しました。",
        variant: "destructive",
      });
      setNewMessage(messageContent);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-destructive">
        <p>{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setError(null);
            fetchMessages();
          }}
          className="mt-4"
        >
          再試行
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/messages/direct">
            <ArrowLeft className="h-4 w-4" />
            メッセージ一覧に戻る
          </Link>
        </Button>

        <Card className="h-[calc(100vh-300px)] flex flex-col">
          <CardContent className="h-full flex flex-col p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  表示可能なメッセージ: {displayLimit}件
                </p>
              </div>
            </div>
            {/* メッセージ一覧 */}
            <div 
              ref={messageListRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.isSentByMe ? "flex-row-reverse" : ""
                  }`}
                >
                  {!message.isSentByMe && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <UserRound className="h-4 w-4 text-primary text-sky-400" />
                    </div>
                  )}
                  <div
                    className={`group relative flex flex-col max-w-[70%] ${
                      message.isSentByMe ? "items-end" : "items-start"
                    }`}
                  >
                    {!message.isSentByMe && (
                      <Link 
                        href={`/users/${message.sender.id}`}
                        className="text-sm font-medium mb-1 hover:underline"
                      >
                        {otherUserProfile?.profile?.displayName || message.sender.profile?.displayName || 'ユーザー'}
                      </Link>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.isSentByMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatRelativeTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <FeatureAccess feature="messageAccess.direct.send" params={{ targetUserType: otherUserProfile?.role }}>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1"
              disabled={isSending}
            />
            <Button type="submit" disabled={isSending || !newMessage.trim()}>
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </FeatureAccess>
    </div>
  );
} 