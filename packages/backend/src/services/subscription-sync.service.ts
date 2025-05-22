import cron from 'node-cron';
import { PlanType, SubscriptionStatus, User, Subscription, Prisma } from '@prisma/client';
import Stripe from 'stripe';
import { determinePlanType } from '../utils/subscription.utils.js';
import { AppError } from '../middlewares/error.middleware.js';
import { logger } from '../utils/logger.js';
import { prisma } from '../lib/prisma.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

interface UserWithSubscription extends User {
  subscription: Subscription | null;
}

interface SyncErrorDetails {
  [key: string]: string | number | undefined;
  errorType: string;
  errorMessage: string;
  subscriptionId?: string;
  currentPlanType: PlanType;
  timestamp: string;
}

export class SubscriptionSyncService {
  private syncJob: cron.ScheduledTask;
  private readonly syncInterval: string;

  constructor() {
    // 環境変数から同期間隔を取得（デフォルトは1時間ごと）
    this.syncInterval = process.env.SUBSCRIPTION_SYNC_INTERVAL || '0 * * * *';
    
    this.syncJob = cron.schedule(this.syncInterval, async () => {
      logger.info('Starting subscription sync job', { timestamp: new Date().toISOString() });
      await this.syncAllSubscriptions();
    });
  }

  start() {
    this.syncJob.start();
    logger.info('Subscription sync job started', { interval: this.syncInterval });
  }

  stop() {
    this.syncJob.stop();
    logger.info('Subscription sync job stopped');
  }

  private async syncAllSubscriptions() {
    try {
      const users = await prisma.user.findMany({
        where: {
          subscription: {
            isNot: null,
          },
          planType: {
            not: 'free',
          },
        },
        include: {
          subscription: true,
        },
      });

      logger.info(`Found ${users.length} users with active subscriptions`);

      for (const user of users) {
        try {
          await this.syncUserSubscription(user);
        } catch (error) {
          console.error(`Failed to sync subscription for user ${user.id}:`, error);
          
          // エラーの詳細情報を記録
          const errorDetails: SyncErrorDetails = {
            errorType: error instanceof Error ? error.constructor.name : typeof error,
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            subscriptionId: user.subscription?.stripeSubscriptionId || undefined,
            currentPlanType: user.planType,
            timestamp: new Date().toISOString(),
          };

          await prisma.errorLog.create({
            data: {
              userId: user.id,
              type: 'SUBSCRIPTION_SYNC_ERROR',
              error: errorDetails.errorMessage,
              metadata: errorDetails as Prisma.JsonObject,
            },
          });

          // 重大なエラーの場合は管理者に通知
          if (!(error instanceof Stripe.errors.StripeInvalidRequestError)) {
            await this.notifyAdminOfSyncError(user.id, errorDetails);
          }
        }
      }

      logger.info('Subscription sync completed', { timestamp: new Date().toISOString() });
    } catch (error) {
      logger.error('Failed to sync all subscriptions:', error);
      throw new AppError(500, 'SYNC_ERROR', 'サブスクリプション同期中にエラーが発生しました');
    }
  }

  private async syncUserSubscription(user: UserWithSubscription) {
    if (!user.subscription?.stripeSubscriptionId) {
      await this.downgradeToFree(user);
      return;
    }

    try {
      const stripeSubscription = await stripe.subscriptions.retrieve(user.subscription.stripeSubscriptionId);
      const stripeProduct = await stripe.products.retrieve(stripeSubscription.items.data[0].price.product as string);
      const newPlanType = await determinePlanType(stripeProduct);

      const isStale =
        user.planType !== newPlanType ||
        user.subscription.status !== stripeSubscription.status ||
        user.subscription.currentPeriodEnd.getTime() !== new Date(stripeSubscription.current_period_end * 1000).getTime();

      if (isStale) {
        logger.info(`Updating subscription for user ${user.id}:`, {
          currentPlanType: user.planType,
          newPlanType,
          currentStatus: user.subscription.status,
          newStatus: stripeSubscription.status,
        });

        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: { planType: newPlanType },
          }),
          prisma.subscription.update({
            where: { id: user.subscription.id },
            data: {
              status: stripeSubscription.status as SubscriptionStatus,
              currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
              currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
              cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            },
          }),
          prisma.subscriptionHistory.create({
            data: {
              userId: user.id,
              planName: stripeProduct.name,
              amount: stripeSubscription.items.data[0].price.unit_amount || 0,
              status: stripeSubscription.status as SubscriptionStatus,
              stripeSubscriptionId: stripeSubscription.id,
              previousPlanType: user.planType,
              newPlanType,
              metadata: {
                reason: 'auto_sync',
                productId: stripeProduct.id,
                priceId: stripeSubscription.items.data[0].price.id,
                interval: stripeSubscription.items.data[0].price.recurring?.interval,
                intervalCount: stripeSubscription.items.data[0].price.recurring?.interval_count,
              },
            },
          }),
        ]);
      }
    } catch (error) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        await this.downgradeToFree(user);
      } else {
        throw error;
      }
    }
  }

  private async downgradeToFree(user: UserWithSubscription) {
    if (!user.subscription) return;

    logger.info(`Downgrading user ${user.id} to free plan`);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { planType: 'free' as PlanType },
      }),
      prisma.subscription.delete({
        where: { id: user.subscription.id },
      }),
      prisma.subscriptionHistory.create({
        data: {
          userId: user.id,
          planName: 'フリープラン（自動降格）',
          amount: 0,
          status: 'canceled' as SubscriptionStatus,
          stripeSubscriptionId: user.subscription.stripeSubscriptionId || 'none',
          previousPlanType: user.planType,
          newPlanType: 'free',
          metadata: {
            reason: 'auto_sync',
            action: 'auto_downgrade',
            timestamp: new Date().toISOString(),
          },
        },
      }),
    ]);
  }

  private async notifyAdminOfSyncError(userId: string, errorDetails: SyncErrorDetails) {
    // 管理者への通知ロジックを実装
    // 例: Slackやメールで通知
    console.error('Critical subscription sync error:', {
      userId,
      ...errorDetails,
    });
  }
} 