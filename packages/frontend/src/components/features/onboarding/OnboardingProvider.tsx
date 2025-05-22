"use client";

import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { WelcomeModal } from "./WelcomeModal";
import { TaskList } from "./TaskList";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";

// オンボーディング状態の型定義
interface OnboardingState {
  showWelcomeModal: boolean;
  completedTasks: string[];
  openSidebarMenus: string[];
}

// コンテキストの型定義
interface OnboardingContextType {
  state: OnboardingState;
  startTour: () => void;
  skipTour: () => void;
  completeTour: () => void;
  completeTask: (taskId: string) => void;
  dismissWelcomeModal: () => void;
  openSidebarMenu: (menuName: string) => void;
}

// コンテキストの作成
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// コンテキストを使用するためのフック
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { user, isLoading } = useAuthStore();
  const [state, setState] = useState<OnboardingState>({
    showWelcomeModal: false,
    completedTasks: [],
    openSidebarMenus: [],
  });

  // 初回ログイン状態を確認
  useEffect(() => {
    if (!isLoading && user) {
      // ローカルストレージから表示済み状態を確認
      const hasSeenWelcome = localStorage.getItem(`welcome_seen_${user.id}`) === 'true';
      
      // ユーザーが初回ログインかどうかを確認
      const isFirstLogin = user.isFirstLogin || false;
      
      // 初回ログインかつウェルカムモーダルを表示していない場合のみ表示
      setState(prev => ({
        ...prev,
        showWelcomeModal: isFirstLogin && !hasSeenWelcome,
      }));
    }
  }, [isLoading, user]);

  // スタートアップガイドを開始
  const startTour = () => {
    setState(prev => ({
      ...prev,
      showWelcomeModal: false,
    }));
    
    // ウェルカムモーダルを表示済みとしてマーク
    if (user?.id) {
      localStorage.setItem(`welcome_seen_${user.id}`, 'true');
    }
    
    // 初回ログインフラグを更新
    api.post('/users/update-first-login').catch(error => {
      console.error('初回ログインステータスの更新に失敗しました', error);
    });
  };

  // スタートアップガイドをスキップ
  const skipTour = () => {
    setState(prev => ({
      ...prev,
      showWelcomeModal: false,
    }));
    
    // ウェルカムモーダルを表示済みとしてマーク
    if (user?.id) {
      localStorage.setItem(`welcome_seen_${user.id}`, 'true');
    }
    
    // 初回ログインフラグを更新
    api.post('/users/update-first-login').catch(error => {
      console.error('初回ログインステータスの更新に失敗しました', error);
    });
  };

  // ツアーを完了（互換性のために残す）
  const completeTour = () => {
    // 何もしない
  };

  // タスクを完了
  const completeTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      completedTasks: [...prev.completedTasks, taskId],
    }));
  };

  // ウェルカムモーダルを閉じる
  const dismissWelcomeModal = () => {
    setState(prev => ({
      ...prev,
      showWelcomeModal: false,
    }));
    
    // 初回ログインフラグを更新
    api.post('/users/update-first-login').catch(error => {
      console.error('初回ログインステータスの更新に失敗しました', error);
    });
  };

  // サイドバーメニューを開く
  const openSidebarMenu = (menuName: string) => {
    setState(prev => ({
      ...prev,
      openSidebarMenus: [...prev.openSidebarMenus, menuName],
    }));
    
    // カスタムイベントを発火してサイドバーメニューを開く
    window.dispatchEvent(new CustomEvent('openSidebarSubmenu', { 
      detail: { menuName } 
    }));
  };

  // コンテキスト値
  const value = {
    state,
    startTour,
    skipTour,
    completeTour,
    completeTask,
    dismissWelcomeModal,
    openSidebarMenu,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
      
      {/* ウェルカムモーダル */}
      {state.showWelcomeModal && (
        <WelcomeModal
          onStart={startTour}
          onSkip={skipTour}
        />
      )}
    </OnboardingContext.Provider>
  );
}

// タスクリストを表示するコンポーネント
export function OnboardingTaskList({ className, onHiddenChange }: { className?: string; onHiddenChange?: (hidden: boolean) => void }) {
  const { completeTask } = useOnboarding();
  
  return (
    <TaskList
      onTaskComplete={completeTask}
      className={className}
      onHiddenChange={onHiddenChange}
    />
  );
} 