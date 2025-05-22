import { PlanType } from '@prisma/client';
import Stripe from 'stripe';

export async function determinePlanType(product: Stripe.Product): Promise<PlanType> {
  // 環境変数からProduct IDを取得
  const PRODUCT_ID_TO_planType: Record<string, PlanType> = {
    [process.env.STRIPE_PRODUCT_STANDARD_MONTHLY!]: 'standard',
    [process.env.STRIPE_PRODUCT_STANDARD_QUARTERLY!]: 'standard',
    [process.env.STRIPE_PRODUCT_STANDARD_YEARLY!]: 'standard',
    [process.env.STRIPE_PRODUCT_PREMIUM_MONTHLY!]: 'premium',
    [process.env.STRIPE_PRODUCT_PREMIUM_QUARTERLY!]: 'premium',
    [process.env.STRIPE_PRODUCT_PREMIUM_YEARLY!]: 'premium',
    [process.env.STRIPE_PRODUCT_STARTUP_PARTNER!]: 'startup_partner',
  };

  // 1. まずProduct IDで判定
  const planTypeFromId = PRODUCT_ID_TO_planType[product.id];
  if (planTypeFromId) {
    return planTypeFromId;
  }

  // 2. メタデータで判定（フォールバック）
  if (product.metadata.planType && 
      ['premium', 'standard', 'startup_partner', 'free'].includes(product.metadata.planType)) {
    return product.metadata.planType as PlanType;
  }

  // 3. 名前で判定（最終フォールバック）
  const name = product.name.toLowerCase();
  if (name.includes('プレミアム')) return 'premium';
  if (name.includes('スタンダード')) return 'standard';
  if (name.includes('起業仲間')) return 'startup_partner';

  return 'free';
} 