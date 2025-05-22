'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { subscriptionApi, SubscriptionInfo } from '@/lib/api/subscription';
import { PLAN_NAMES_JA } from '@/constants/planFeatures';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// プランIDの定義
const PLAN_IDS = {
  startup_partner: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTUP_PARTNER!,
  standard: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY!,
  // プレミアムプランは一時的に停止
  // premium: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY!,
} as const;

// 環境変数の存在チェック
if (!PLAN_IDS.startup_partner || !PLAN_IDS.standard) {
  console.error('Stripe Price IDが設定されていません:', {
    startup_partner: PLAN_IDS.startup_partner,
    standard: PLAN_IDS.standard,
  });
}

// プラン変更確認用の型定義
type PlanChangeConfirmation = {
  planType: 'startup_partner' | 'standard'; // premiumを削除
  planName: string;
  currentPlanName: string;
  price: number;
  currentPrice: number;
} | null;

export default function BillingPage() {
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [confirmPlanChange, setConfirmPlanChange] = useState<PlanChangeConfirmation>(null);
  const { isAuthenticated, user } = useAuthStore();
  
  // 投資家ユーザーかどうかをチェック
  const isInvestor = user?.role === 'investor';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          return;
        }
        // 投資家ユーザーの場合はサブスクリプション情報を取得しない
        if (!isInvestor) {
          const subInfo = await subscriptionApi.getInfo();
          setSubscription(subInfo);
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        toast({
          title: 'エラー',
          description: 'サブスクリプション情報の取得に失敗しました。',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast, isAuthenticated, isInvestor]);

  // 購入完了後の処理
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success' || status === 'subscribe_success') {
      toast({
        title: '成功',
        description: 'サブスクリプションの購入が完了しました。',
        variant: 'default',
      });
    } else if (status === 'canceled') {
      toast({
        title: '中断',
        description: 'サブスクリプションの購入がキャンセルされました。',
        variant: 'default',
      });
    }
  }, [searchParams, toast]);

  const handlePortalAccess = async () => {
    try {
      const { url } = await subscriptionApi.createPortalSession();
      window.location.href = url;
    } catch (error) {
      console.error('Error accessing portal:', error);
      toast({
        title: 'エラー',
        description: 'カスタマーポータルへのアクセスに失敗しました。',
        variant: 'destructive',
      });
    }
  };

  // 現在のプランの価格を取得する関数
  const getCurrentPlanPrice = (planType: string | undefined) => {
    switch (planType) {
      case 'startup_partner':
        return 3000; // 2980円→3000円に変更
      case 'standard':
        return 5000;
      case 'premium':
        return 7800; // 変更していないが実際には使用されない
      default:
        return 0;
    }
  };

  // プラン名を取得する関数
  const getPlanName = (planType: string | undefined) => {
    switch (planType) {
      case 'startup_partner':
        return '起業仲間募集プラン';
      case 'standard':
        return 'スタンダードプラン';
      case 'premium':
        return 'プレミアムプラン';
      default:
        return 'フリープラン';
    }
  };

  // プラン変更の確認を開始
  const handlePlanChangeConfirmation = async (planType: 'startup_partner' | 'standard') => {
    // フリープランユーザーの場合は直接チェックアウトページに遷移
    if (!subscription?.subscription) {
      try {
        setProcessingPlan(planType);
        
        // プランIDが設定されているか確認
        if (!PLAN_IDS[planType]) {
          throw new Error(`プランID（${planType}）が設定されていません。`);
        }

        const response = await subscriptionApi.subscribe(PLAN_IDS[planType]);
        
        if (!response?.sessionUrl) {
          throw new Error('セッションURLの取得に失敗しました。');
        }
        
        window.location.href = response.sessionUrl;
      } catch (error) {
        console.error('Error creating subscription session:', error);
        let errorMessage = 'サブスクリプション作成中にエラーが発生しました。';
        
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null) {
          errorMessage = JSON.stringify(error);
        }
        
        toast({
          title: 'エラー',
          description: errorMessage,
          variant: 'destructive',
        });
        setProcessingPlan(null);
      }
      return;
    }

    // 既存のサブスクリプションがある場合はプラン変更の確認ダイアログを表示
    const newPlanPrice = getCurrentPlanPrice(planType);
    const currentPlanPrice = getCurrentPlanPrice(subscription?.planType);
    
    setConfirmPlanChange({
      planType,
      planName: getPlanName(planType),
      currentPlanName: getPlanName(subscription?.planType),
      price: newPlanPrice,
      currentPrice: currentPlanPrice
    });
  };

  // プラン変更の実行
  const handlePlanChange = async () => {
    if (!confirmPlanChange) return;

    try {
      setProcessingPlan(confirmPlanChange.planType);
      
      // プランIDが設定されているか確認
      if (!PLAN_IDS[confirmPlanChange.planType]) {
        toast({
          title: 'エラー',
          description: 'プランIDが設定されていません。',
          variant: 'destructive',
        });
        return;
      }

      const response = await subscriptionApi.changePlan(PLAN_IDS[confirmPlanChange.planType]);
      
      if (response.success) {
        toast({
          title: '成功',
          description: 'プランを変更しました。',
          variant: 'default',
        });
        // サブスクリプション情報を再取得
        const subInfo = await subscriptionApi.getInfo();
        setSubscription(subInfo);
      }
    } catch (error) {
      console.error('Error changing plan:', error);
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : 'プラン変更中にエラーが発生しました。',
        variant: 'destructive',
      });
    } finally {
      setProcessingPlan(null);
      setConfirmPlanChange(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  // 投資家ユーザーの場合は専用のページを表示
  if (isInvestor) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">請求設定</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>現在のプラン</CardTitle>
            <CardDescription>投資家プラン（無料）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center mb-8">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">すべて無料で利用可能です</h3>
              <p className="text-green-700 dark:text-green-400">
                投資家ユーザーは特別なサービスとして、すべての機能を無料でご利用いただけます。
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">投資家プラン特典</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    プロフィール閲覧無制限
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    メッセージ送信制限なし
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    プロジェクト情報の詳細閲覧
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    優先サポート対応
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">請求設定</h1>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>現在のプラン</CardTitle>
              <CardDescription>
                {subscription?.planType && PLAN_NAMES_JA[subscription.planType] || 'フリープラン'}
              </CardDescription>
            </div>
            {subscription?.subscription?.status === 'active' && (
              <Badge variant="outline" className="ml-2">
                月額プラン
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {subscription?.subscription ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">ステータス</p>
                <p className="font-medium">{subscription.subscription.status === 'active' ? '有効' : '無効'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">次回の請求日</p>
                <p className="font-medium">
                  {new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString('ja-JP')}
                </p>
              </div>
              {subscription.subscription.cancelAtPeriodEnd && (
                <div className="text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30 p-4 rounded-lg">
                  <p className="font-medium">プランの解約予定</p>
                  <p className="text-sm">
                    このサブスクリプションは
                    {new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString('ja-JP')}
                    に解約されます。
                  </p>
                </div>
              )}
              <div className="pt-4">
                <Button 
                  onClick={handlePortalAccess}
                  className="w-full md:w-auto"
                >
                  Stripeポータルで管理する
                </Button>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Stripeポータルでは以下の操作が可能です：
                </p>
                <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside space-y-1">
                  <li>支払い方法の変更</li>
                  <li>請求履歴の確認</li>
                  <li>サブスクリプションのキャンセル</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-medium mb-2">現在フリープランをご利用中です</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                有料プランにアップグレードして、より多くの機能をご利用ください。
              </p>
            </div>
          )}

          {/* プラン一覧を常に表示 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-6">利用可能なプラン</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {/* 起業仲間募集プラン - 投資家ロール以外に表示 */}
              {user?.role !== 'investor' && (
                <div className="p-6 border dark:border-gray-700 rounded-lg flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">起業仲間募集プラン</h3>
                    <p className="text-2xl font-bold mb-4">¥3,000<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/月</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      起業仲間を見つけたい方向けのプラン。プロフィール閲覧や募集投稿が可能です。
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        プロフィール閲覧無制限
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        募集投稿作成可能
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        メッセージ送信制限解除
                      </li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => handlePlanChangeConfirmation('startup_partner')}
                    disabled={processingPlan === 'startup_partner' || !PLAN_IDS.startup_partner || subscription?.planType === 'startup_partner'}
                    className="w-full"
                    variant={subscription?.planType === 'startup_partner' ? 'secondary' : 'outline'}
                  >
                    {processingPlan === 'startup_partner' ? '処理中...' : 
                      subscription?.planType === 'startup_partner' ? '現在のプラン' :
                      '選択する'}
                  </Button>
                </div>
              )}

              {/* スタンダードプラン */}
              <div className="p-6 border dark:border-gray-700 rounded-lg flex flex-col bg-blue-50 dark:bg-blue-950 relative">
                <div className="absolute -top-2 right-4">
                  <Badge className="bg-blue-500 dark:bg-blue-400 text-white">人気</Badge>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">スタンダードプラン</h3>
                  <p className="text-2xl font-bold mb-4">¥5,000<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/月</span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    個人利用に最適な標準プラン。基本的な機能が全て利用可能です。
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      起業仲間募集プランの全機能
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      プロジェクト作成数増加
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      SNS情報の閲覧
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => handlePlanChangeConfirmation('standard')}
                  disabled={processingPlan === 'standard' || !PLAN_IDS.standard || subscription?.planType === 'standard'}
                  className="w-full"
                  variant={subscription?.planType === 'standard' ? 'secondary' : 'default'}
                >
                  {processingPlan === 'standard' ? '処理中...' : 
                    subscription?.planType === 'standard' ? '現在のプラン' :
                    '選択する'}
                </Button>
              </div>

              {/* プレミアムプラン - 一時的に停止中 */}
              <div className="p-6 border dark:border-gray-700 rounded-lg flex flex-col bg-gray-100 dark:bg-gray-800 opacity-75">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">プレミアムプラン</h3>
                  <p className="text-2xl font-bold mb-4">提供停止中<span className="text-sm font-normal text-gray-600 dark:text-gray-400"></span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    現在このプランは一時的に提供を停止しています。
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm text-gray-400">
                      <Check className="h-4 w-4 mr-2 text-gray-400" />
                      スタンダードプランの全機能
                    </li>
                    <li className="flex items-center text-sm text-gray-400">
                      <Check className="h-4 w-4 mr-2 text-gray-400" />
                      優先サポート対応
                    </li>
                    <li className="flex items-center text-sm text-gray-400">
                      <Check className="h-4 w-4 mr-2 text-gray-400" />
                      高度な分析機能
                    </li>
                  </ul>
                </div>
                <Button
                  disabled={true}
                  className="w-full"
                  variant="outline"
                >
                  現在利用できません
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <h4 className="font-medium mb-2">全てのプランに含まれる基本機能：</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>24時間年中無休のシステム利用</li>
              <li>基本的なサポート対応</li>
              <li>セキュアな情報管理</li>
              <li>定期的な機能アップデート</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* プラン変更確認ダイアログ */}
      <Dialog open={confirmPlanChange !== null} onOpenChange={(open) => !open && setConfirmPlanChange(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>プラン変更の確認</DialogTitle>
            <DialogDescription>
              以下の内容でプランを変更します。変更後、即時に新しい料金が適用されます。
            </DialogDescription>
          </DialogHeader>
          {confirmPlanChange && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">現在のプラン</p>
                    <p className="font-medium">{confirmPlanChange.currentPlanName}</p>
                  </div>
                  <p className="font-medium">¥{confirmPlanChange.currentPrice.toLocaleString()}/月</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">変更後のプラン</p>
                    <p className="font-medium">{confirmPlanChange.planName}</p>
                  </div>
                  <p className="font-medium">¥{confirmPlanChange.price.toLocaleString()}/月</p>
                </div>
                {confirmPlanChange.price > confirmPlanChange.currentPrice ? (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      ※ プランアップグレードに伴い、差額の¥{(confirmPlanChange.price - confirmPlanChange.currentPrice).toLocaleString()}が即時請求されます。
                    </p>
                  </div>
                ) : confirmPlanChange.price < confirmPlanChange.currentPrice ? (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      ※ ダウングレードの場合、現在の期間は既存の料金が適用され、次回更新時から新しい料金が適用されます。
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmPlanChange(null)}>
              キャンセル
            </Button>
            <Button onClick={handlePlanChange} disabled={processingPlan !== null}>
              {processingPlan ? '処理中...' : 'プランを変更する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 