"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useFeatureAccess } from "@/store/featureAccess";
import { PLAN_NAMES_JA } from "@/constants/planFeatures";
import { useEffect } from "react";
import type { FeatureParams } from '@/store/featureAccess';


type FeatureKey = 
  | 'messageDisplayLimit'
  | 'messageAccess.direct.view'
  | 'messageAccess.direct.send'
  | 'messageAccess.project.view'
  | 'messageAccess.project.send'
  | 'projectAccess.create'
  | 'projectAccess.view'
  | 'profileAccess.sns.viewable'
  | 'profileAccess.sns.editable'
  | 'profileAccess.view';

interface FeatureAccessProps {
  children: React.ReactNode;
  feature: FeatureKey;
  currentLimit?: number;
  maxLimit?: number;
  params?: FeatureParams;
}

const getFeatureDisplayName = (feature: FeatureKey) => {
  switch (feature) {
    case 'messageDisplayLimit':
      return 'メッセージ表示';
    case 'messageAccess.direct.view':
      return 'ダイレクトメッセージ閲覧';
    case 'messageAccess.direct.send':
      return 'ダイレクトメッセージ送信';
    case 'messageAccess.project.view':
      return 'プロジェクトメッセージ閲覧';
    case 'messageAccess.project.send':
      return 'プロジェクトメッセージ送信';
    case 'projectAccess.create':
      return 'プロジェクト作成';
    case 'projectAccess.view':
      return 'プロジェクト閲覧';
    case 'profileAccess.sns.viewable':
      return 'SNSリンク表示';
    case 'profileAccess.sns.editable':
      return 'SNSリンク編集';
    case 'profileAccess.view':
      return 'プロフィール閲覧';
    default:
      return feature;
  }
};

export function FeatureAccess({ children, feature, currentLimit, maxLimit, params }: FeatureAccessProps) {
  const { canUseFeature, status, fetchStatus } = useFeatureAccess();
  const displayName = getFeatureDisplayName(feature);
  const planName = PLAN_NAMES_JA[status?.planType || 'free'];

  // コンポーネントマウント時にステータスを取得
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // ローディング中は子コンポーネントを表示
  if (!status) {
    return children;
  }

  if (!canUseFeature(feature, params)) {
    return (
      <Alert variant="destructive">
        <Lock className="h-4 w-4" />
        <AlertTitle>プレミアム機能</AlertTitle>
        <AlertDescription>
          <p className="mb-4">
            {maxLimit ? (
              <>
                {planName}の{displayName}上限（{currentLimit}/{maxLimit}）に達しました。
                より多くの機能を利用するには、プランのアップグレードまたは招待コードが必要です。
              </>
            ) : (
              <>
                この機能を利用するにはプランのアップグレードまたは招待コードが必要です。
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="default" className="w-full sm:w-auto">
              <Link href="/settings/billing">
                プランをアップグレード
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/invitation">
                招待コードを使用
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return children;
} 