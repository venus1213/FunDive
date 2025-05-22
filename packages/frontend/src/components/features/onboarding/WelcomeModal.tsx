"use client";

import * as React from "react";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";

interface WelcomeModalProps {
  onStart: () => void;
  onSkip: () => void;
}

export function WelcomeModal({ onStart, onSkip }: WelcomeModalProps) {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(true);
  
  const userType = user?.role === 'investor' ? 'investor' : 'entrepreneur';
  const userName = user?.profile?.displayName || user?.name || "ユーザー";

  const welcomeContent = {
    entrepreneur: {
      title: `${userName}さん、FUNDIVEへようこそ！`,
      description: 'あなたのプロジェクトを投資家に見つけてもらうための第一歩を踏み出しましょう。スタートアップガイドでFUNDIVEの使い方をご紹介します。',
      primaryAction: 'はじめる',
      features: [
        'プロジェクト作成と公開',
        '投資家とのマッチング',
        'メッセージングシステム'
      ]
    },
    investor: {
      title: `${userName}さん、FUNDIVEへようこそ！`,
      description: '革新的なプロジェクトを見つけ、起業家とつながるための第一歩を踏み出しましょう。スタートアップガイドでFUNDIVEの使い方をご紹介します。',
      primaryAction: 'はじめる',
      features: [
        'プロジェクト検索とフィルタリング',
        '起業家とのコネクション',
        'ポートフォリオ管理'
      ]
    }
  };

  const content = welcomeContent[userType];

  const handleClose = () => {
    setOpen(false);
    // ウェルカムモーダルを表示済みとしてマーク
    if (user?.id) {
      localStorage.setItem(`welcome_seen_${user.id}`, 'true');
    }
  };

  const handleStart = () => {
    handleClose();
    onStart();
    // 初回ログインフラグを更新
    updateFirstLoginStatus();
  };

  const handleSkip = () => {
    handleClose();
    onSkip();
    // 初回ログインフラグを更新
    updateFirstLoginStatus();
  };

  const updateFirstLoginStatus = async () => {
    try {
      await api.post('/users/update-first-login');
    } catch (error) {
      console.error('初回ログインステータスの更新に失敗しました', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{content.title}</DialogTitle>
          <DialogDescription className="pt-2">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">主な機能:</h4>
          <ul className="space-y-2">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <DialogFooter className="mt-6 flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleSkip}>
            スキップ
          </Button>
          <Button onClick={handleStart}>
            {content.primaryAction}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 