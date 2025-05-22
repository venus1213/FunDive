"use client";

import { useEffect, useState, useRef } from "react";
import { Message } from "@/types/project";
import { projectApi} from "@/lib/api/project";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/auth";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { io } from "socket.io-client";
import { getAuth } from "firebase/auth";
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from "react"
import { PLAN_FEATURES } from "@/constants/planFeatures";
import { FeatureAccess } from "@/components/features/access/FeatureAccess";
import { ProjectChatMessage } from "@/lib/api/project";

dayjs.extend(relativeTime);
dayjs.locale('ja');

const formatMessageTime = (dateString: string): string => {
  const now = dayjs();
  const messageTime = dayjs(dateString);
  const diffInHours = now.diff(messageTime, 'hour');

  if (diffInHours < 24) {
    return messageTime.fromNow();  // 〇分前、〇時間前
  } else if (diffInHours < 48) {
    return '昨日';
  } else {
    return messageTime.format('M月D日');
  }
};

interface ProjectMember {
  id: string;
  name: string;
}

interface ProjectMessagesResponse {
  messages: Message[];
  pagination: {
    total: number;
    limit: number;
    displayed: number;
  };
}

interface ProjectMessagesProps {
  projectId: string;
}

export function ProjectMessages({ projectId }: ProjectMessagesProps) {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ProjectChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [displayLimit, setDisplayLimit] = useState<number>(PLAN_FEATURES.free.messageDisplayLimit);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [projectType, setProjectType] = useState<'entrepreneur' | 'investor' | 'cofounder' | null>(null);

  const scrollToBottom = () => {
    if (shouldScrollToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // スクロール位置の監視
  const handleScroll = () => {
    if (!messageListRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
    setShouldScrollToBottom(isNearBottom);
  };

  useEffect(() => {
    try {
      if (socketRef.current?.connected) return;

      const setupSocket = async () => {
        try {
          const auth = getAuth();
          const currentUser = auth.currentUser;
          if (!currentUser) {
            return;
          }

          const token = await currentUser.getIdToken();
          
          socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL , {
            withCredentials: true,
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            path: '/socket.io',
            auth: {
              token,
              type: 'firebase'
            }
          });

          // 接続イベントのリスナー
          socketRef.current.on('connect', () => {
            socketRef.current?.emit("join-project", projectId);
          });

          // エラーイベントのリスナー
          socketRef.current.on('connect_error', (error: Error) => {
            toast({
              title: "接続エラー",
              description: "メッセージサーバーへの接続に失敗しました。",
              variant: "destructive",
            });
          });

          // メッセージ受信のリスナー
          const handleNewMessage = (newMessage: ProjectChatMessage) => {
            setMessages((prevMessages) => {
              if (prevMessages.some(msg => msg.id === newMessage.id)) {
                return prevMessages;
              }
              const updatedMessages = [...prevMessages, newMessage];
              if (shouldScrollToBottom) {
                setTimeout(scrollToBottom, 100);
              }
              return updatedMessages;
            });
          };

          socketRef.current.on(`project-message:${projectId}`, handleNewMessage);

          // 切断イベントのリスナー
          socketRef.current.on('disconnect', () => {
          });
        } catch (error) {
          toast({
            title: "エラー",
            description: "WebSocket接続の設定に失敗しました。",
            variant: "destructive",
          });
        }
      };

      setupSocket();

      return () => {
        if (socketRef.current) {
          socketRef.current.off(`project-message:${projectId}`);
          socketRef.current.emit("leave-project", projectId);
          socketRef.current.disconnect();
        }
      };
    } catch (error) {
      toast({
        title: "エラー",
        description: "WebSocket接続の設定に失敗しました。",
        variant: "destructive",
      });
    }
  }, [projectId, toast]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await projectApi.getProjectMessages(projectId);
        // メッセージを日付順に並び替え
        const messageArray = (response.messages || []).sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        
        // プランに基づいて表示件数を制限
        let limit = PLAN_FEATURES.free.messageDisplayLimit;
        
        // 管理者は制限なし
        if (user?.isAdmin) {
          limit = 999999;
        }
        // 有効な招待ユーザーはプレミアムプランの権限を持つ
        else if (user?.invitationExpires && new Date(user.invitationExpires) > new Date()) {
          limit = PLAN_FEATURES.premium.messageDisplayLimit;
        }
        // 通常のプラン制限を適用
        else if (user?.planType) {
          limit = PLAN_FEATURES[user.planType].messageDisplayLimit;
        }
        
        setDisplayLimit(limit);
        
        // 最新のメッセージを優先して表示
        const limitedMessages = messageArray.slice(-limit);
        setMessages(limitedMessages);
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "メッセージの取得に失敗しました。",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    };

    fetchMessages();
  }, [projectId, toast, user?.planType]);

  // メンバー一覧を取得
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await projectApi.getProjectMembers(projectId);
        setMembers(data);
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "メンバー一覧の取得に失敗しました",
          variant: "destructive",
        });
      }
    };
    fetchMembers();
  }, [projectId, toast]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await projectApi.getProject(projectId);
        setProjectType(response.projectType);
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "プロジェクトの取得に失敗しました。",
          variant: "destructive",
        });
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsSending(true);
    try {
      // メンバー名のパターンを作成
      const memberPattern = members
        .map(m => m.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .sort((a, b) => b.length - a.length)
        .join('|');
      
      // メンバー名に基づいてメンションを検出（改行も考慮）
      const mentionRegex = new RegExp(`@(${memberPattern})(?:[\\s\\n]|$)`, 'g');
      const mentionedUserIds = [];
      let match;
      
      while ((match = mentionRegex.exec(newMessage)) !== null) {
        const memberName = match[1];
        const member = members.find(m => m.name === memberName);
        if (member) {
          mentionedUserIds.push(member.id);
        }
      }

      await projectApi.sendProjectMessage(projectId, newMessage, mentionedUserIds);
      setNewMessage("");
      setShouldScrollToBottom(true);
      scrollToBottom();
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "メッセージの送信に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  // メンション候補の表示制御
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    
    const position = e.target.selectionStart || 0;
    setCursorPosition(position);

    // @の後の文字列を抽出
    const beforeCursor = value.slice(0, position);
    const match = beforeCursor.match(/@(\w*)$/);
    
    if (match) {
      setMentionQuery(match[1]);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  // メンバーを選択してメンション
  const handleSelectMember = (member: ProjectMember) => {
    if (!textareaRef.current) return;

    const beforeCursor = newMessage.slice(0, cursorPosition);
    const match = beforeCursor.match(/@(\w*)$/);
    
    if (match) {
      const start = cursorPosition - match[0].length;
      const newValue = 
        newMessage.slice(0, start) + 
        `@${member.name}\n` + 
        newMessage.slice(cursorPosition);
      
      setNewMessage(newValue);
      setShowMentions(false);
      
      // カーソル位置を更新（改行の後に移動）
      const newPosition = start + member.name.length + 2; // @ + name + \n
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(newPosition, newPosition);
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  // メンバー名のパターンを作成（長い名前から順にマッチングするように）
  const createMemberPattern = () => {
    return members
      .map(m => m.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .sort((a, b) => b.length - a.length)
      .join('|');
  };

  // メッセージ内のメンションを処理する関数
  const processMessageContent = (content: string, senderId: string) => {
    const memberPattern = createMemberPattern();
    // 改行を保持しながらメンションを検出
    const lines = content.split('\n');
    
    return lines.map((line, lineIndex) => {
      const mentionRegex = new RegExp(`(@(?:${memberPattern}))(?:\\s|$)`, 'g');
      const parts = line.split(mentionRegex);
      
      const processedLine = parts.map((part, partIndex) => {
        if (part?.startsWith('@')) {
          const memberName = part.slice(1);
          const member = members.find(m => m.name === memberName);
          if (member) {
            return (
              <span
                key={`${lineIndex}-${partIndex}`}
                data-mention
                className={`font-semibold ${
                  senderId === user?.id ? "text-blue-300" : "text-blue-500"
                }`}
              >
                {part}
              </span>
            );
          }
        }
        return part;
      });

      // 各行の最後に改行を追加（最後の行以外）
      return (
        <React.Fragment key={lineIndex}>
          {processedLine}
          {lineIndex < lines.length - 1 && '\n'}
        </React.Fragment>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <FeatureAccess feature="messageAccess.project.view">
      <div className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 min-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400" ref={messageListRef} onScroll={handleScroll}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MessageCircle className="h-12 w-12 mb-4" />
              <p>メッセージはありません</p>
            </div>
          ) : (
            <div className="space-y-4 pb-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.senderId === user?.id ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-sm font-semibold mb-1 px-4">
                    {message.sender?.name || members.find(m => m.id === message.senderId)?.name || "不明なユーザー"}
                  </span>
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.senderId === user?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {processMessageContent(message.content, message.senderId)}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-4">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4 border-t relative">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleInput}
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
          {showMentions && members.length > 0 && (
            <div className="absolute bottom-full left-4 mb-2 w-64 max-h-48 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border">
              {members
                .filter(member => 
                  member.name.toLowerCase().includes(mentionQuery.toLowerCase())
                )
                .map(member => (
                  <button
                    key={member.id}
                    className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
                    onClick={() => handleSelectMember(member)}
                  >
                    <span className="text-sm">{member.name}</span>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </FeatureAccess>
  );
} 