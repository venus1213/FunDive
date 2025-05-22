"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { CheckCircle, Circle, PartyPopper, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  path: string;
  userTypes: ('entrepreneur' | 'investor')[];
  isCompleted: boolean;
}

interface TaskListProps {
  onTaskComplete: (taskId: string) => void;
  className?: string;
  onHiddenChange?: (hidden: boolean) => void;  // 非表示状態の変更を通知するコールバック
}

export function TaskList({ onTaskComplete, className, onHiddenChange }: TaskListProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  
  const userType = user?.role === 'investor' ? 'investor' : 'entrepreneur';

  // ローカルストレージから非表示設定を読み込む
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isHidden = localStorage.getItem('hideCompletedStartupGuide') === 'true';
      setHidden(isHidden);
      
      // 親コンポーネントに初期状態を通知
      onHiddenChange?.(isHidden);
    }
  }, [onHiddenChange]);

  // タスクの定義
  useEffect(() => {
    const allTasks: Task[] = [
      {
        id: 'complete-profile',
        title: 'プロフィールを完成させる',
        description: '基本情報を入力して、あなたのプロフィールを充実させましょう。',
        path: '/settings/profile',
        isCompleted: false,
        userTypes: ['entrepreneur', 'investor']
      },
      {
        id: 'create-first-project',
        title: '最初のプロジェクトを作成する',
        description: 'あなたのプロジェクトの詳細を入力し、投資家に公開しましょう。',
        path: '/projects/create',
        isCompleted: false,
        userTypes: ['entrepreneur']
      },
      {
        id: 'browse-projects',
        title: 'プロジェクトを閲覧する',
        description: '興味のあるプロジェクトを探して、可能性を発見しましょう。',
        path: '/projects/search',
        isCompleted: false,
        userTypes: ['investor']
      },
      {
        id: 'bookmark-project',
        title: 'プロジェクトをブックマークする',
        description: '気になるプロジェクトをブックマークして、後で確認できるようにしましょう。',
        path: '/projects/search',
        isCompleted: false,
        userTypes: ['investor']
      },
      {
        id: 'search-users',
        title: 'ユーザーを検索する',
        description: userType === 'entrepreneur' 
          ? '投資家を検索して、あなたのプロジェクトに興味を持ってくれそうな人を見つけましょう。' 
          : '起業家を検索して、興味のあるプロジェクトを持つ人を見つけましょう。',
        path: userType === 'entrepreneur' ? '/search/investors' : '/search/entrepreneurs',
        isCompleted: false,
        userTypes: ['entrepreneur', 'investor']
      },
      {
        id: 'set-notification-preferences',
        title: '通知設定を確認する',
        description: '重要な更新情報を見逃さないように、通知設定を確認しましょう。',
        path: '/notifications/settings',
        isCompleted: false,
        userTypes: ['entrepreneur', 'investor']
      }
    ];
    
    // ユーザータイプに合わせてフィルタリング
    const filteredTasks = allTasks.filter(task => task.userTypes.includes(userType));
    
    // タスクの完了状態を取得
    const fetchTaskStatus = async () => {
      try {
        const response = await api.get('/users/onboarding-tasks');
        const completedTasks = response.data.completedTasks || [];
        
        // 完了状態を更新
        const updatedTasks = filteredTasks.map(task => ({
          ...task,
          isCompleted: completedTasks.includes(task.id)
        }));
        
        setTasks(updatedTasks);
      } catch (error) {
        console.error('タスク状態の取得に失敗しました', error);
        setTasks(filteredTasks);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTaskStatus();
  }, [userType]);

  // タスクの完了状態を更新
  const handleTaskAction = async (taskId: string, path: string) => {
    // タスク完了状態の更新
    try {
      await api.post('/users/complete-task', { taskId });
      
      // ローカル状態の更新
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, isCompleted: true } : task
        )
      );
      
      // 親コンポーネントに通知
      onTaskComplete(taskId);
      
      // ページ遷移
      router.push(path);
    } catch (error) {
      console.error('タスク完了の更新に失敗しました', error);
      // エラーが発生しても遷移は行う
      router.push(path);
    }
  };

  // スタートアップガイドを非表示にする
  const hideStartupGuide = () => {
    setHidden(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideCompletedStartupGuide', 'true');
    }
    // 親コンポーネントに非表示状態を通知
    onHiddenChange?.(true);
  };

  // スタートアップガイドを表示する
  const showStartupGuide = () => {
    setHidden(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideCompletedStartupGuide', 'false');
    }
    // 親コンポーネントに表示状態を通知
    onHiddenChange?.(false);
  };

  // 進捗状況の計算
  const completedTasksCount = tasks.filter(task => task.isCompleted).length;
  const progress = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;
  const allTasksCompleted = tasks.length > 0 && completedTasksCount === tasks.length;

  // すべてのタスクが完了していて、非表示設定がオンの場合は何も表示しない
  if ((allTasksCompleted && hidden) || (loading && hidden)) {
    return null;
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>スタートアップガイド</CardTitle>
          <CardDescription>読み込み中...</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={0} max={100} className="animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="relative">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>スタートアップガイド</CardTitle>
            <CardDescription>
              FUNDIVEを最大限に活用するための初期ステップを完了しましょう
            </CardDescription>
          </div>
          {allTasksCompleted && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 absolute top-4 right-4"
              onClick={hideStartupGuide}
              title="スタートアップガイドを非表示にする"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-2">
          <Progress value={progress} max={100} />
          <p className="text-xs text-muted-foreground mt-1">{progress}% 完了</p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map(task => (
            <li 
              key={task.id} 
              className={cn(
                "flex items-start gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer",
                task.isCompleted && "bg-accent/20"
              )}
              onClick={() => {
                if (!task.isCompleted) {
                  // 未完了のタスクの場合は完了処理も行う
                  handleTaskAction(task.id, task.path);
                } else {
                  // 完了済みのタスクの場合は単純に遷移
                  router.push(task.path);
                }
              }}
            >
              <div className="mt-0.5 flex-shrink-0">
                {task.isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{task.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                {!task.isCompleted ? (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="px-0 h-auto text-xs mt-1"
                    onClick={(e) => {
                      e.stopPropagation(); // 親要素のクリックイベントを停止
                      handleTaskAction(task.id, task.path);
                    }}
                  >
                    今すぐ実行
                  </Button>
                ) : (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="px-0 h-auto text-xs mt-1 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation(); // 親要素のクリックイベントを停止
                      router.push(task.path);
                    }}
                  >
                    移動
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      {allTasksCompleted && (
        <CardFooter className="bg-muted/50 flex justify-between">
          <div className="flex items-center gap-2 py-2">
            <PartyPopper className="h-5 w-5 text-yellow-500" />
            <p className="text-sm font-medium">おめでとうございます！すべてのタスクを完了しました。</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={hideStartupGuide}
            className="text-xs"
          >
            非表示にする
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 