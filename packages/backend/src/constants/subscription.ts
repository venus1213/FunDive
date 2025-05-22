import { PlanType, SubscriptionStatus } from '@prisma/client';

export const PLAN_ORDER: Record<PlanType, number> = {
  'free': 0,
  'startup_partner': 1,
  'standard': 2,
  'premium': 3,
} as const;

export const SUBSCRIPTION_STATUS: Record<string, SubscriptionStatus> = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due',
  UNPAID: 'unpaid',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  TRIALING: 'trialing',
  PAUSED: 'paused',
} as const;

export const DEFAULT_ERROR_MESSAGES = {
  UNAUTHORIZED: '認証が必要です。',
  USER_NOT_FOUND: 'ユーザーが見つかりません。',
  SUBSCRIPTION_NOT_FOUND: 'アクティブなサブスクリプションが見つかりません。',
  INTERNAL_ERROR: '処理に失敗しました。',
  STRIPE_ERROR: 'Stripeでの処理に失敗しました。',
} as const; 