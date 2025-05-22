import { Request, Response } from 'express';
import { PlanType, SubscriptionStatus, User, Subscription, SubscriptionHistory, Prisma } from '@prisma/client';
import Stripe from 'stripe';
import { determinePlanType } from '../utils/subscription.utils';
import { handleStripeError } from '../utils/error-handler';
import { logger } from '../utils/logger';
import { StripeService } from '../services/stripe.service';
import { DEFAULT_ERROR_MESSAGES } from '../constants/subscription';
import { prisma } from '../lib/prisma';
import { logError } from '../utils/error-logger';

// 型定義
interface SubscriptionUpdateData {
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

interface SubscriptionHistoryData {
  userId: string;
  planName: string;
  amount: number;
  status: SubscriptionStatus;
  stripeSubscriptionId: string;
  previousPlanType?: PlanType;
  newPlanType: PlanType;
  metadata: Prisma.InputJsonValue;
}

interface ErrorResponse {
  code: string;
  message: string;
  type?: string;
  param?: string;
}

interface PlanInfo {
  priceId: string;
  productId: string;
  name: string;
  description: string | null;
  amount: number | null;
  currency: string;
  interval: string | null;
  intervalCount: number | null;
}

interface UserWithSubscription extends User {
  subscription: Subscription | null;
  subscriptionHistory: SubscriptionHistory[];
}

const stripeService = new StripeService(process.env.STRIPE_SECRET_KEY || '', prisma);

export class SubscriptionController {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  // プライベートメソッド: エラーハンドリング
  private async handleError(res: Response, error: unknown, message: string) {
    await logError({
      userId: res.locals?.user?.uid,
      type: 'subscription_error',
      error,
      metadata: {
        message,
        errorType: error instanceof Stripe.errors.StripeError ? 'stripe_error' : 'internal_error'
      },
    });
    
    if (error instanceof Stripe.errors.StripeError) {
      const { status, error: stripeError } = handleStripeError(error);
      return res.status(status).json({ error: stripeError });
    }
    
    return res.status(500).json({ 
      error: { 
        code: 'INTERNAL_ERROR', 
        message: DEFAULT_ERROR_MESSAGES.INTERNAL_ERROR 
      } 
    });
  }

  // プライベートメソッド: サブスクリプション情報の更新
  private async updateSubscriptionData(
    userId: string,
    subscriptionId: string,
    updateData: SubscriptionUpdateData,
    historyData: SubscriptionHistoryData
  ) {
    try {
      return await prisma.$transaction(async (tx) => {
        await tx.subscription.update({
          where: { id: subscriptionId },
          data: updateData
        });

        await tx.subscriptionHistory.create({
          data: historyData
        });

        return;
      });
    } catch (error) {
      await logError({
        userId,
        type: 'subscription_update_error',
        error,
        metadata: {
          subscriptionId,
          updateData: {
            status: updateData.status,
            currentPeriodStart: updateData.currentPeriodStart.toISOString(),
            currentPeriodEnd: updateData.currentPeriodEnd.toISOString(),
            cancelAtPeriodEnd: updateData.cancelAtPeriodEnd
          },
          historyData: {
            userId: historyData.userId,
            planName: historyData.planName,
            amount: historyData.amount,
            status: historyData.status,
            stripeSubscriptionId: historyData.stripeSubscriptionId
          }
        }
      });
      throw error;
    }
  }

  // プライベートメソッド: ユーザー認証チェック
  private async validateUser(userId: string | undefined): Promise<{ user: UserWithSubscription | null; error?: ErrorResponse }> {
    if (!userId) {
      return { 
        user: null, 
        error: { 
          code: 'UNAUTHORIZED', 
          message: '認証が必要です。' 
        } 
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        subscription: true,
        subscriptionHistory: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        }
      },
    });

    if (!user) {
      return { 
        user: null, 
        error: { 
          code: 'USER_NOT_FOUND', 
          message: 'ユーザーが見つかりません。' 
        } 
      };
    }

    return { user: user as UserWithSubscription };
  }

  // サブスクリプション情報の取得
  async getSubscriptionInfo(req: Request, res: Response) {
    try {
      const { user, error } = await this.validateUser(req.user?.id);
      if (error || !user) {
        return res.status(401).json({ error });
      }

      logger.info('Getting subscription info for user', { userId: user.id });

      // フリープランの処理
      if (user.planType === 'free') {
        if (user.subscription) {
          await this.handleFreePlanWithSubscription(user);
        }
        return res.json({ 
          subscription: null,
          planType: user.planType,
          isStale: false
        });
      }

      // サブスクリプション情報の取得と検証
      const subscriptionInfo = await this.getAndValidateSubscriptionInfo(user);
      return res.json(subscriptionInfo);

    } catch (error) {
      return this.handleError(res, error, 'Failed to get subscription info');
    }
  }

  // プライベートメソッド: フリープランユーザーのサブスクリプション処理
  private async handleFreePlanWithSubscription(user: UserWithSubscription) {
    if (!user.subscription) return;

    await prisma.$transaction([
      prisma.subscription.delete({
        where: { id: user.subscription.id }
      }),
      prisma.subscriptionHistory.create({
        data: {
          userId: user.id,
          planName: 'フリープラン',
          amount: 0,
          status: 'canceled',
          stripeSubscriptionId: user.subscription.stripeSubscriptionId || '',
          previousPlanType: user.planType,
          newPlanType: 'free',
          metadata: {
            reason: 'planType_mismatch',
            action: 'subscription_deleted'
          }
        }
      }),
      prisma.errorLog.create({
        data: {
          userId: user.id,
          type: 'SUBSCRIPTION_PLAN_MISMATCH',
          error: 'フリープランユーザーにサブスクリプションが存在',
          metadata: {
            subscriptionId: user.subscription.id,
            planType: user.planType,
            subscriptionStatus: user.subscription.status
          }
        }
      })
    ]);
  }

  // プライベートメソッド: サブスクリプション情報の取得と検証
  private async getAndValidateSubscriptionInfo(user: UserWithSubscription) {
    if (!user.subscription?.stripeSubscriptionId) {
      if (user.planType !== 'free') {
        await this.handleInvalidSubscription(user);
        return { 
          subscription: null,
          planType: 'free',
          isStale: false,
          message: 'サブスクリプション情報が見つからないため、フリープランに変更されました。'
        };
      }
      return { 
        subscription: null,
        planType: user.planType,
        isStale: false
      };
    }

    const stripeSubscription = await stripeService.retrieveSubscription(user.subscription.stripeSubscriptionId);
    const stripeProduct = await stripeService.retrieveProduct(stripeSubscription.items.data[0].price.product as string);
    const newPlanType = await determinePlanType(stripeProduct);
    
    if (!user.subscription) {
      throw new Error('Subscription is null after validation');
    }

    const isStale = this.checkIfSubscriptionIsStale(user, stripeSubscription, newPlanType);

    if (isStale) {
      await this.updateStaleSubscription(user, stripeSubscription, stripeProduct, newPlanType);
    }

    const price = await stripeService.retrievePrice(stripeSubscription.items.data[0].price.id);
    const interval = this.determineInterval(price);

    return {
      subscription: {
        id: user.subscription.id,
        status: isStale ? stripeSubscription.status : user.subscription.status,
        currentPeriodEnd: isStale ? new Date(stripeSubscription.current_period_end * 1000) : user.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: isStale ? stripeSubscription.cancel_at_period_end : user.subscription.cancelAtPeriodEnd,
        stripeSubscriptionId: user.subscription.stripeSubscriptionId,
        stripeCustomerId: user.subscription.stripeCustomerId,
        interval,
        currentPeriodStart: stripeSubscription.current_period_start,
      },
      planType: isStale ? newPlanType : user.planType,
      isStale
    };
  }

  // プライベートメソッド: サブスクリプションの更新が必要かチェック
  private checkIfSubscriptionIsStale(user: UserWithSubscription, stripeSubscription: Stripe.Subscription, newPlanType: PlanType): boolean {
    if (!user.subscription) return true;

    return user.planType !== newPlanType ||
           user.subscription.status !== stripeSubscription.status ||
           user.subscription.currentPeriodEnd.getTime() !== new Date(stripeSubscription.current_period_end * 1000).getTime() ||
           user.subscription.cancelAtPeriodEnd !== stripeSubscription.cancel_at_period_end;
  }

  // プライベートメソッド: 古くなったサブスクリプション情報の更新
  private async updateStaleSubscription(
    user: UserWithSubscription,
    stripeSubscription: Stripe.Subscription,
    stripeProduct: Stripe.Product,
    newPlanType: PlanType
  ) {
    if (!user.subscription) {
      throw new Error('Subscription is null');
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { planType: newPlanType }
      }),
      prisma.subscription.update({
        where: { id: user.subscription.id },
        data: {
          status: stripeSubscription.status as SubscriptionStatus,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
        }
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
            reason: 'stripe_sync',
            productId: stripeProduct.id,
            priceId: stripeSubscription.items.data[0].price.id,
            interval: stripeSubscription.items.data[0].price.recurring?.interval,
            intervalCount: stripeSubscription.items.data[0].price.recurring?.interval_count
          }
        }
      })
    ]);
  }

  // プライベートメソッド: 支払い間隔の決定
  private determineInterval(price: Stripe.Price): string {
    return price.recurring?.interval === 'year' ? 'year' : 
      price.recurring?.interval_count === 3 ? 'quarter' : 'month';
  }

  // プライベートメソッド: Stripeエラーのログ記録
  private async logStripeError(user: UserWithSubscription, error: Stripe.errors.StripeError) {
    if (!user.subscription) return;

    await logError({
      userId: user.id,
      type: error instanceof Stripe.errors.StripeConnectionError ? 'STRIPE_CONNECTION_ERROR' :
        error instanceof Stripe.errors.StripeAPIError ? 'STRIPE_API_ERROR' :
          error instanceof Stripe.errors.StripeInvalidRequestError ? 'STRIPE_INVALID_REQUEST' :
            'STRIPE_UNKNOWN_ERROR',
      error,
      metadata: {
        subscriptionId: user.subscription.id,
        stripeSubscriptionId: user.subscription.stripeSubscriptionId,
        errorType: error.type,
        errorCode: error.code
      }
    });
  }

  // プライベートメソッド: 無効なサブスクリプションの処理
  private async handleInvalidSubscription(user: UserWithSubscription) {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { planType: 'free' as PlanType }
      }),
      ...(user.subscription ? [
        prisma.subscription.delete({
          where: { id: user.subscription.id }
        })
      ] : []),
      prisma.subscriptionHistory.create({
        data: {
          userId: user.id,
          planName: 'フリープラン',
          amount: 0,
          status: 'canceled',
          stripeSubscriptionId: user.subscription?.stripeSubscriptionId || '',
          previousPlanType: user.planType,
          newPlanType: 'free',
          metadata: {
            reason: 'subscription_not_found',
            action: 'auto_downgrade'
          }
        }
      })
    ]);
  }

  // プライベートメソッド: プラン情報の変換
  private convertToPlanInfo(price: Stripe.Price): PlanInfo {
    const product = price.product as Stripe.Product;
    return {
      priceId: price.id,
      productId: product.id,
      name: product.name,
      description: product.description,
      amount: price.unit_amount,
      currency: price.currency,
      interval: price.recurring?.interval || null,
      intervalCount: price.recurring?.interval_count || null,
    };
  }

  // プライベートメソッド: アクティブなプランのフィルタリング
  private filterActivePlans(prices: Stripe.Price[]): PlanInfo[] {
    return prices
      .filter(price => {
        const product = price.product as Stripe.Product;
        return product.active === true;
      })
      .map(price => this.convertToPlanInfo(price));
  }

  // 利用可能なプランと価格の取得
  async getAvailablePlans(req: Request, res: Response) {
    try {
      logger.info('Fetching available plans');

      const prices = await stripeService.listPrices({
        active: true,
        expand: ['data.product'],
        limit: 100,
      });

      logger.info('Retrieved prices from Stripe', {
        totalPrices: prices.data.length,
      });

      // プラン情報の整理
      const plans = prices.data.reduce((acc: any[], price) => {
        const product = price.product as Stripe.Product;
        if (!product.active) return acc;

        const interval = price.recurring?.interval || 'month';
        const intervalCount = price.recurring?.interval_count || 1;

        // 起業仲間募集プランは1ヶ月のみ
        if (product.id === process.env.STRIPE_PRODUCT_STARTUP_PARTNER) {
          if (interval === 'month' && intervalCount === 1) {
            acc.push({
              id: 'startup-team',
              name: product.name,
              description: product.description,
              amount: price.unit_amount || 0,
              currency: price.currency,
              interval: `${intervalCount > 1 ? `${intervalCount}ヶ月` : '月'}`,
              stripePriceId: price.id,
              productId: product.id,
              intervalType: interval,
              intervalCount: intervalCount
            });
          }
          return acc;
        }

        // スタンダードプランは3ヶ月と1年、プレミアムプランは一時的に停止
        if (product.id === process.env.STRIPE_PRODUCT_STANDARD_MONTHLY) {
          if (
            (interval === 'month' && intervalCount === 3) || 
            (interval === 'year' && intervalCount === 1)
          ) {
            acc.push({
              id: 'standard',
              name: product.name,
              description: product.description,
              amount: price.unit_amount || 0,
              currency: price.currency,
              interval: interval === 'year' ? '年' : `${intervalCount}ヶ月`,
              stripePriceId: price.id,
              productId: product.id,
              intervalType: interval,
              intervalCount: intervalCount
            });
          }
        }

        // プレミアムプランは一時的に停止
        // if (product.id === process.env.STRIPE_PRODUCT_PREMIUM_MONTHLY) {
        //   if (
        //     (interval === 'month' && intervalCount === 3) || 
        //     (interval === 'year' && intervalCount === 1)
        //   ) {
        //     acc.push({
        //       id: 'premium',
        //       name: product.name,
        //       description: product.description,
        //       amount: price.unit_amount || 0,
        //       currency: price.currency,
        //       interval: interval === 'year' ? '年' : `${intervalCount}ヶ月`,
        //       stripePriceId: price.id,
        //       productId: product.id,
        //       intervalType: interval,
        //       intervalCount: intervalCount
        //     });
        //   }
        // }

        return acc;
      }, []);

      logger.info('Filtered active plans', {
        totalActivePlans: plans.length,
      });

      return res.json({ plans });
    } catch (error) {
      return this.handleError(res, error, 'Failed to get available plans');
    }
  }

  // プライベートメソッド: チェックアウトセッションの作成
  private async createCheckoutSession(userId: string, priceId: string): Promise<Stripe.Checkout.Session> {
    // 選択されたプランの価格情報を取得
    const price = await stripeService.retrievePrice(priceId);

    if (!price || !price.active) {
      throw new Error('選択されたプランは現在利用できません。');
    }

    const product = price.product as Stripe.Product;
    if (!product.active) {
      throw new Error('選択された商品は現在利用できません。');
    }

    // プランの説明を設定（メタデータとして使用）
    let planDescription = '';
    if (product.id === process.env.STRIPE_PRODUCT_STARTUP_PARTNER) {
      planDescription = '起業仲間を募集したい方向けのプラン';
    } else if (product.id === process.env.STRIPE_PRODUCT_STANDARD_MONTHLY) {
      planDescription = '個人で利用する方向けの標準プラン';
    } else if (product.id === process.env.STRIPE_PRODUCT_PREMIUM_MONTHLY) {
      planDescription = 'ビジネス利用向けの高機能プラン';
    }

    return stripeService.createCheckoutSession({
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${process.env.FRONTEND_URL}/settings/billing?status=subscribe_success`,
      cancel_url: `${process.env.FRONTEND_URL}/settings/billing`,
      metadata: {
        userId,
        planDescription
      },
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      locale: 'ja',
      custom_text: {
        submit: {
          message: 'ご利用開始までもう少しです。支払い情報を入力してください。'
        }
      },
      subscription_data: {
        description: 'FUNDIVEサブスクリプション',
        metadata: {
          userId,
          source: 'checkout_session',
          productId: product.id,
          priceId: price.id
        }
      },
      consent_collection: {
        terms_of_service: 'required'
      }
    });
  }

  // 新規サブスクリプション登録セッションの作成
  async createSubscriptionSession(req: Request, res: Response) {
    try {
      const { user, error } = await this.validateUser(req.user?.id);
      if (error || !user) {
        return res.status(401).json({ error });
      }

      const { priceId } = req.body;
      if (!priceId) {
        return res.status(400).json({
          error: {
            code: 'INVALID_REQUEST',
            message: 'プランIDが必要です。'
          }
        });
      }

      logger.info('Creating new subscription session', {
        userId: user.id,
        priceId
      });

      // 既存のサブスクリプションチェック
      if (user.subscription?.stripeSubscriptionId) {
        logger.info('Existing subscription found', {
          userId: user.id,
          existingSubscriptionId: user.subscription.stripeSubscriptionId,
          status: 'subscription_exists'
        });
        return res.status(400).json({
          error: {
            code: 'SUBSCRIPTION_EXISTS',
            message: '既にサブスクリプションが存在します。プランを変更する場合は、プラン変更APIを使用してください。'
          }
        });
      }

      // 価格情報の取得と検証
      try {
        const price = await this.stripe.prices.retrieve(priceId);
        if (!price.active) {
          return res.status(400).json({
            error: {
              code: 'INVALID_PRICE',
              message: '指定されたプランは現在利用できません。'
            }
          });
        }
      } catch (error) {
        logger.error('Error retrieving price:', {
          priceId,
          error
        });
        return res.status(400).json({
          error: {
            code: 'INVALID_PRICE',
            message: '無効なプランIDが指定されました。'
          }
        });
      }

      // チェックアウトセッションの作成
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: user.email,
        success_url: `${process.env.FRONTEND_URL}/settings/billing?status=success`,
        cancel_url: `${process.env.FRONTEND_URL}/settings/billing?status=canceled`,
        metadata: {
          userId: user.id,
        },
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        locale: 'ja',
        subscription_data: {
          metadata: {
            userId: user.id,
          }
        }
      });

      logger.info('Checkout session created successfully', {
        userId: user.id,
        sessionId: session.id,
        url: session.url
      });

      return res.json({
        sessionUrl: session.url
      });

    } catch (error) {
      logger.error('Failed to create subscription session:', {
        error,
        userId: req.user?.id,
        body: req.body
      });

      // Stripeエラーの詳細なハンドリング
      if (error instanceof Stripe.errors.StripeError) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
          error: {
            code: error.code || 'STRIPE_ERROR',
            message: error.message || 'Stripeでエラーが発生しました。',
            type: error.type,
          }
        });
      }

      return res.status(500).json({
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '予期せぬエラーが発生しました。'
        }
      });
    }
  }

  // Webhookハンドラー
  async handleWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    if (!sig || Array.isArray(sig)) {
      return res.status(400).json({ error: { code: 'INVALID_REQUEST', message: 'Stripe署名が無効です。' } });
    }

    try {
      const event = stripeService.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId } = session.metadata as { userId: string };
          
        if (!userId) {
          return res.status(400).json({ error: { code: 'INVALID_METADATA', message: 'セッションメタデータにユーザーIDが見つかりません。' } });
        }

        const subscription = await stripeService.retrieveSubscription(session.subscription as string);
        const product = await stripeService.retrieveProduct(subscription.items.data[0].price.product as string);
        const planType = await determinePlanType(product);

        // セッションのメタデータから新規登録かプラン変更かを判断
        const isUpgrade = session.metadata?.type === 'plan_change';

        if (isUpgrade) {
          // プラン変更の場合は、customer.subscription.updatedイベントで処理するため、
          // ここではサブスクリプション情報の更新のみ行う
          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: { planType },
            }),
            prisma.subscription.upsert({
              where: { userId },
              create: {
                userId,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                status: 'active',
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
              update: {
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                status: 'active',
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
            })
          ]);
        } else {
          // 新規サブスクリプション登録の場合は、通常通り処理
          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: { planType },
            }),
            prisma.subscription.upsert({
              where: { userId },
              create: {
                userId,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                status: 'active',
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
              update: {
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                status: 'active',
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
            }),
            prisma.subscriptionHistory.create({
              data: {
                userId,
                planName: product.name,
                amount: subscription.items.data[0].price.unit_amount || 0,
                status: subscription.status as SubscriptionStatus,
                stripeSubscriptionId: subscription.id,
                newPlanType: planType,
                metadata: {
                  productId: product.id,
                  priceId: subscription.items.data[0].price.id,
                  interval: subscription.items.data[0].price.recurring?.interval,
                  intervalCount: subscription.items.data[0].price.recurring?.interval_count,
                }
              },
            }),
          ]);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
          
        // 既に処理済みのイベントかどうかをチェック
        const processedEvent = await prisma.processedStripeEvent.findUnique({
          where: { eventId: event.id }
        });

        if (processedEvent) {
          return res.json({ received: true });
        }

        const product = await stripeService.retrieveProduct(subscription.items.data[0].price.product as string);
        const planType = await determinePlanType(product);
            
        const existingSub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
          include: { user: true },
        });

        if (existingSub) {
          const currentPrice = subscription.items.data[0].price;
          const previousPriceId = subscription.metadata?.previousPriceId;
          const isUpgrade = subscription.metadata?.type === 'plan_change';

          const shouldCreateHistory = 
              existingSub.user.planType !== planType ||
              existingSub.status !== subscription.status ||
              (isUpgrade && currentPrice.id !== previousPriceId);

          await prisma.$transaction(async (tx) => {
            // イベントを処理済みとしてマーク
            await tx.processedStripeEvent.create({
              data: {
                eventId: event.id,
                type: event.type,
                processedAt: new Date()
              }
            });

            // サブスクリプション更新処理
            await tx.subscription.update({
              where: { id: existingSub.id },
              data: {
                status: subscription.status as SubscriptionStatus,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end
              }
            });

            // ユーザープラン更新
            await tx.user.update({
              where: { id: existingSub.userId },
              data: { planType }
            });

            // 必要な場合のみ履歴を作成
            if (shouldCreateHistory) {
              await tx.subscriptionHistory.create({
                data: {
                  userId: existingSub.userId,
                  planName: product.name,
                  amount: subscription.items.data[0].price.unit_amount || 0,
                  status: subscription.status as SubscriptionStatus,
                  stripeSubscriptionId: subscription.id,
                  previousPlanType: existingSub.user.planType,
                  newPlanType: planType,
                  metadata: {
                    reason: subscription.metadata?.isUpgrade ? 'upgrade' : 'update',
                    productId: product.id,
                    priceId: subscription.items.data[0].price.id,
                    interval: subscription.items.data[0].price.recurring?.interval,
                    intervalCount: subscription.items.data[0].price.recurring?.interval_count
                  }
                }
              });
            }
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const existingSub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (existingSub) {
          await prisma.$transaction([
            prisma.user.update({
              where: { id: existingSub.userId },
              data: { planType: 'free' },
            }),
            prisma.subscription.delete({
              where: { id: existingSub.id },
            }),
          ]);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await stripeService.retrieveSubscription(invoice.subscription as string);
        const customer = await stripeService.retrieveCustomer(invoice.customer as string);
          
        // ユーザーを特定
        const user = await prisma.user.findFirst({
          where: {
            subscription: {
              stripeCustomerId: customer.id
            }
          },
          include: { subscription: true }
        });

        if (user) {
          let failureMessage = '支払い処理に失敗しました';
          if (typeof invoice.payment_intent !== 'string' && invoice.payment_intent?.last_payment_error?.message) {
            failureMessage = invoice.payment_intent.last_payment_error.message;
          }

          // フリープランに強制ダウングレード
          await prisma.$transaction([
            prisma.user.update({
              where: { id: user.id },
              data: { planType: 'free' }
            }),
            prisma.subscription.delete({
              where: { id: user.subscription!.id }
            }),
            prisma.subscriptionHistory.create({
              data: {
                userId: user.id,
                planName: 'フリープラン（支払い失敗による強制ダウングレード）',
                amount: 0,
                status: 'canceled',
                stripeSubscriptionId: subscription.id,
                previousPlanType: user.planType,
                newPlanType: 'free',
                metadata: {
                  reason: 'payment_failed',
                  invoiceId: invoice.id,
                  failureMessage
                }
              }
            })
          ]);

          // 支払い失敗の通知を作成
          await prisma.notification.create({
            data: {
              userId: user.id,
              type: 'subscription_payment_failed',
              title: 'サブスクリプションの支払いに失敗しました',
              content: '支払いに失敗したため、プランがフリープランに変更されました。支払い方法を更新して、再度サブスクリプションをご契約ください。',
            }
          });
        }
        break;
      }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook handling failed:', {
        error,
        headers: req.headers,
        body: req.body,
      });
      res.status(400).json({ error: { code: 'WEBHOOK_ERROR', message: 'Webhookの処理に失敗しました。' } });
    }
  }

  // プラン変更
  async changePlan(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { priceId } = req.body;

      if (!userId) {
        return res.status(401).json({ message: '認証が必要です' });
      }

      // 現在のサブスクリプション情報を取得
      const currentSubscription = await prisma.subscription.findFirst({
        where: {
          userId,
          status: 'active',
        },
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!currentSubscription) {
        return res.status(404).json({ message: 'アクティブなサブスクリプションが見つかりません' });
      }

      if (!currentSubscription.stripeSubscriptionId) {
        return res.status(404).json({ message: 'Stripeサブスクリプション情報が見つかりません' });
      }

      const stripeSubscription = await this.stripe.subscriptions.retrieve(currentSubscription.stripeSubscriptionId);

      // キャンセル済みの場合、キャンセルを取り消す
      if (stripeSubscription.cancel_at_period_end) {
        await this.stripe.subscriptions.update(currentSubscription.stripeSubscriptionId, {
          cancel_at_period_end: false,
        });
      }

      // サブスクリプションを直接更新
      const updatedSubscription = await this.stripe.subscriptions.update(
        currentSubscription.stripeSubscriptionId,
        {
          items: [{
            id: stripeSubscription.items.data[0].id,
            price: priceId,
          }],
          proration_behavior: 'always_invoice',
          billing_cycle_anchor: 'now',
          metadata: {
            userId,
            type: 'plan_change',
            previousPriceId: stripeSubscription.items.data[0].price.id,
          }
        }
      );

      // DBを更新
      await prisma.subscription.update({
        where: { id: currentSubscription.id },
        data: {
          status: updatedSubscription.status as SubscriptionStatus,
          currentPeriodStart: new Date(updatedSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end
        }
      });

      res.json({
        success: true,
        subscription: {
          status: updatedSubscription.status,
          currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end
        }
      });

    } catch (error) {
      console.error('Plan change error:', error);
      res.status(500).json({ message: 'プラン変更中にエラーが発生しました' });
    }
  }

  // カスタマーポータルセッションの作成
  async createPortalSession(req: Request, res: Response) {
    try {
      logger.debug('Creating portal session - Start', {
        userId: req.user?.id,
        body: req.body
      });

      const { user, error } = await this.validateUser(req.user?.id);
      if (error || !user) {
        logger.error('Portal session creation failed - User validation error', {
          error,
          userId: req.user?.id
        });
        return res.status(401).json({ error });
      }

      logger.debug('User validation successful', {
        userId: user.id,
        planType: user.planType,
        hasSubscription: !!user.subscription
      });

      // フリープランユーザーの場合は、Stripeのチェックアウトセッションを作成
      if (user.planType === 'free' || !user.subscription) {
        logger.debug('Free plan user detected - Creating checkout session', {
          userId: user.id,
          planType: user.planType
        });

        // 利用可能なプランを取得
        const prices = await stripeService.listPrices({
          active: true,
          expand: ['data.product'],
          limit: 100,
        });

        // デフォルトのプランを選択（例：スタンダードプラン3ヶ月）
        const defaultPlan = prices.data.find(price => {
          const product = price.product as Stripe.Product;
          logger.debug('Checking product for default plan', {
            productId: product.id,
            productName: product.name,
            interval: price.recurring?.interval,
            intervalCount: price.recurring?.interval_count,
            standardProductId: process.env.STRIPE_PRODUCT_STANDARD_MONTHLY
          });
          return (
            product.active &&
            (product.id === process.env.STRIPE_PRODUCT_STANDARD_MONTHLY ||
             product.name.toLowerCase().includes('スタンダード')) &&
            price.recurring?.interval === 'month' &&
            price.recurring?.interval_count === 3
          );
        });

        if (!defaultPlan) {
          logger.error('Default plan not found', {
            userId: user.id,
            availablePlans: prices.data.length,
            availableProducts: prices.data.map(price => ({
              productId: (price.product as Stripe.Product).id,
              productName: (price.product as Stripe.Product).name,
              interval: price.recurring?.interval,
              intervalCount: price.recurring?.interval_count,
              active: (price.product as Stripe.Product).active
            }))
          });

          // 代替プランを探す
          const alternativePlan = prices.data.find(price => {
            const product = price.product as Stripe.Product;
            return (
              product.active &&
              product.name.toLowerCase().includes('スタンダード') &&
              price.recurring?.interval === 'month'
            );
          });

          if (alternativePlan) {
            logger.info('Using alternative standard plan', {
              userId: user.id,
              productId: (alternativePlan.product as Stripe.Product).id,
              productName: (alternativePlan.product as Stripe.Product).name,
              interval: alternativePlan.recurring?.interval,
              intervalCount: alternativePlan.recurring?.interval_count
            });
            return res.json({ url: (await this.createCheckoutSession(user.id, alternativePlan.id)).url });
          }

          return res.status(500).json({
            error: {
              code: 'PLAN_NOT_FOUND',
              message: 'デフォルトプランが見つかりません。'
            }
          });
        }

        const session = await this.createCheckoutSession(user.id, defaultPlan.id);
        
        logger.debug('Checkout session created for free plan user', {
          userId: user.id,
          sessionId: session.id,
          priceId: defaultPlan.id
        });

        return res.json({ url: session.url });
      }

      if (!user.subscription?.stripeCustomerId) {
        logger.error('Portal session creation failed - No active subscription', {
          userId: user.id,
          subscription: user.subscription
        });
        return res.status(404).json({
          error: {
            code: 'SUBSCRIPTION_NOT_FOUND',
            message: 'アクティブなサブスクリプションが見つかりません。'
          }
        });
      }

      const { section } = req.body;

      // セッションを作成
      const session = await stripeService.createBillingPortalSession({
        customer: user.subscription.stripeCustomerId,
        return_url: `${process.env.FRONTEND_URL}/settings/billing`,
        flow_data: section === 'subscriptions' && user.subscription.stripeSubscriptionId ? {
          type: 'subscription_update',
          subscription_update: {
            subscription: user.subscription.stripeSubscriptionId
          }
        } : section === 'payment_methods' ? {
          type: 'payment_method_update'
        } : undefined,
      });

      logger.debug('Created billing portal session successfully', {
        userId: user.id,
        sessionId: session.id,
        sessionUrl: session.url,
        flowType: section
      });

      return res.json({ url: session.url });
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 'portal_session_creation_error',
        error,
        metadata: {
          section: req.body.section,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        }
      });
      return this.handleError(res, error, 'Failed to create portal session');
    }
  }

  // 購入履歴の取得
  async getPurchaseHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const requestingUserId = req.user?.id;

      // 認証チェック
      if (!requestingUserId) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: '認証が必要です。' } });
      }

      // 自分以外の履歴は取得できない
      if (userId !== requestingUserId) {
        return res.status(403).json({ error: { code: 'FORBIDDEN', message: '他のユーザーの購入履歴は閲覧できません。' } });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          subscriptionHistory: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'ユーザーが見つかりません。' } });
      }

      return res.json(user.subscriptionHistory);
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 'purchase_history_error',
        error,
        metadata: {
          targetUserId: req.params.userId
        }
      });
      return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: '購入履歴の取得に失敗しました。' } });
    }
  }

  // 管理者用：サブスクリプション情報の手動同期
  async syncSubscriptionManually(req: Request, res: Response) {
    try {
      // 管理者権限チェック
      if (!req.user?.isAdmin) {
        return res.status(403).json({ 
          error: { 
            code: 'FORBIDDEN', 
            message: '管理者権限が必要です。' 
          } 
        });
      }

      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ 
          error: { 
            code: 'INVALID_REQUEST', 
            message: 'ユーザーIDが必要です。' 
          } 
        });
      }

      // ユーザー情報の取得
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      });

      if (!user) {
        return res.status(404).json({ 
          error: { 
            code: 'USER_NOT_FOUND', 
            message: 'ユーザーが見つかりません。' 
          } 
        });
      }

      // Stripeサブスクリプション情報の取得
      if (!user.subscription?.stripeSubscriptionId) {
        // サブスクリプションがない場合はフリープランに設定
        if (user.planType !== 'free') {
          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: { planType: 'free' }
            }),
            prisma.subscriptionHistory.create({
              data: {
                userId,
                planName: 'フリープラン（管理者による同期）',
                amount: 0,
                status: 'canceled',
                stripeSubscriptionId: 'none',
                previousPlanType: user.planType,
                newPlanType: 'free',
                metadata: {
                  reason: 'manual_sync',
                  action: 'admin_downgrade',
                  adminId: req.user?.id
                }
              }
            })
          ]);
        }
        return res.json({ 
          message: 'サブスクリプションが存在しないため、フリープランに設定しました。',
          planType: 'free'
        });
      }

      try {
        const stripeSubscription = await stripeService.retrieveSubscription(user.subscription.stripeSubscriptionId);
        const stripeProduct = await stripeService.retrieveProduct(stripeSubscription.items.data[0].price.product as string);
        const newPlanType = await determinePlanType(stripeProduct);

        // データを更新
        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { planType: newPlanType }
          }),
          prisma.subscription.update({
            where: { id: user.subscription.id },
            data: {
              status: stripeSubscription.status as SubscriptionStatus,
              currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
              currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
              cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
            }
          }),
          prisma.subscriptionHistory.create({
            data: {
              userId,
              planName: stripeProduct.name,
              amount: stripeSubscription.items.data[0].price.unit_amount || 0,
              status: stripeSubscription.status as SubscriptionStatus,
              stripeSubscriptionId: stripeSubscription.id,
              previousPlanType: user.planType,
              newPlanType,
              metadata: {
                reason: 'manual_sync',
                adminId: req.user?.id,
                productId: stripeProduct.id,
                priceId: stripeSubscription.items.data[0].price.id
              }
            }
          })
        ]);

        return res.json({
          message: 'サブスクリプション情報を同期しました。',
          planType: newPlanType,
          subscription: {
            status: stripeSubscription.status,
            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
          }
        });

      } catch (error) {
        await logError({
          userId,
          type: 'MANUAL_SYNC_ERROR',
          error,
          metadata: {
            adminId: req.user?.id,
            subscriptionId: user.subscription.stripeSubscriptionId,
          }
        });

        return res.status(500).json({ 
          error: { 
            code: 'SYNC_FAILED', 
            message: 'サブスクリプション情報の同期に失敗しました。' 
          } 
        });
      }
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 'manual_sync_error',
        error,
        metadata: {
          targetUserId: req.params.userId,
          adminId: req.user?.id,
        }
      });
      return res.status(500).json({ 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: '操作に失敗しました。' 
        } 
      });
    }
  }

  // サブスクリプションのキャンセル
  async cancelSubscription(req: Request, res: Response) {
    try {
      const { user, error } = await this.validateUser(req.user?.id);
      if (error || !user) {
        return res.status(401).json({ error });
      }

      logger.info('Canceling subscription', { userId: user.id });

      if (!user.subscription?.stripeSubscriptionId) {
        return res.status(404).json({
          error: {
            code: 'SUBSCRIPTION_NOT_FOUND',
            message: 'アクティブなサブスクリプションが見つかりません。'
          }
        });
      }

      const subscription = await this.cancelStripeSubscription(user.subscription.stripeSubscriptionId);
      await this.updateCanceledSubscription(user, subscription);

      logger.info('Subscription canceled successfully', {
        userId: user.id,
        subscriptionId: subscription.id,
        effectiveDate: new Date(subscription.current_period_end * 1000)
      });

      return res.json({
        success: true,
        effectiveDate: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: true
      });
    } catch (error) {
      return this.handleError(res, error, 'Failed to cancel subscription');
    }
  }

  // プライベートメソッド: Stripeサブスクリプションのキャンセル
  private async cancelStripeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripeService.updateSubscription({
      subscriptionId,
      data: {
        cancel_at_period_end: true,
        metadata: {
          canceledAt: new Date().toISOString(),
          canceledBy: 'user'
        }
      }
    });
  }

  // プライベートメソッド: キャンセルされたサブスクリプションの更新
  private async updateCanceledSubscription(user: UserWithSubscription, subscription: Stripe.Subscription) {
    if (!user.subscription) return;

    await prisma.$transaction([
      prisma.subscription.update({
        where: { id: user.subscription.id },
        data: {
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end
        }
      }),
      prisma.subscriptionHistory.create({
        data: {
          userId: user.id,
          planName: user.planType,
          amount: subscription.items.data[0].price.unit_amount || 0,
          status: subscription.status,
          stripeSubscriptionId: subscription.id,
          previousPlanType: user.planType,
          newPlanType: user.planType,
          metadata: {
            reason: 'subscription_canceled',
            action: 'status_updated',
            intervalCount: subscription.items.data[0].price.recurring?.interval_count
          }
        }
      })
    ]);
  }

  // 保留中のサブスクリプション情報を取得
  async getPendingSubscription(req: Request, res: Response) {
    try {
      const { user, error } = await this.validateUser(req.user?.id);
      if (error || !user) {
        return res.status(401).json({ error });
      }

      // 保留中のサブスクリプションを取得
      const pendingSubscription = await prisma.pendingSubscription.findFirst({
        where: {
          userId: user.id,
          status: 'pending'
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      if (!pendingSubscription) {
        return res.json({ pendingSubscription: null });
      }

      // 有効なプランIDを取得
      const prices = await stripeService.listPrices({
        active: true,
        expand: ['data.product'],
        limit: 100,
      });

      const plans = this.filterActivePlans(prices.data);
      const matchingPlan = plans.find(plan => plan.name.toLowerCase().includes(pendingSubscription.planType.toLowerCase()));

      if (!matchingPlan) {
        // プランが見つからない場合はpendingSubscriptionを削除
        await prisma.pendingSubscription.delete({
          where: { id: pendingSubscription.id }
        });
        return res.json({ pendingSubscription: null });
      }

      return res.json({
        pendingSubscription: {
          ...pendingSubscription,
          priceId: matchingPlan.priceId,
          planName: matchingPlan.name,
          amount: matchingPlan.amount,
          currency: matchingPlan.currency
        }
      });

    } catch (error) {
      return this.handleError(res, error, 'Failed to get pending subscription');
    }
  }

  // 保留中のサブスクリプションを削除
  async deletePendingSubscription(req: Request, res: Response) {
    try {
      const { user, error } = await this.validateUser(req.user?.id);
      if (error || !user) {
        return res.status(401).json({ error });
      }

      // 保留中のサブスクリプションを取得して削除
      const pendingSubscription = await prisma.pendingSubscription.findFirst({
        where: {
          userId: user.id,
          status: 'pending'
        }
      });

      if (!pendingSubscription) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: '保留中のサブスクリプションが見つかりません。'
          }
        });
      }

      // 削除を実行
      await prisma.$transaction([
        prisma.pendingSubscription.delete({
          where: { id: pendingSubscription.id }
        }),
        prisma.activityLog.create({
          data: {
            userId: user.id,
            actionType: 'delete',
            targetType: 'subscription',
            targetId: pendingSubscription.id,
            details: {
              planType: pendingSubscription.planType,
              billingCycle: pendingSubscription.billingCycle,
              reason: 'user_cancelled',
              status: 'pending'
            }
          }
        })
      ]);

      return res.json({
        message: '保留中のサブスクリプションを削除しました',
        success: true
      });

    } catch (error) {
      return this.handleError(res, error, 'Failed to delete pending subscription');
    }
  }

  // プランIDから金額を取得する関数
  private getPlanAmount(priceId: string): number {
    const planAmounts: { [key: string]: number } = {
      'price_1QpK5lAssd3anqfho6a8koIS': 3000, // 創業仲間募集プラン: 2980円 → 3000円
      'price_1QgQd1Assd3anqfh11kekGpX': 5000, // スタンダードプラン: 5000円（変更なし）
      // 'price_1QgQdbAssd3anqfhekr8UTms': 7800, // プレミアムプラン: 一時的に停止
    };

    return planAmounts[priceId] || 0;
  }

  async createPaymentIntent(req: Request, res: Response) {
    try {
      const { priceId, planId, interval } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: '認証が必要です' });
      }

      const result = await prisma.$transaction(async (tx) => {
        // 支払いIntentを作成
        const paymentIntent = await this.stripe.paymentIntents.create({
          amount: this.getPlanAmount(priceId),
          currency: 'jpy',
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            planId,
            interval,
            userId,
          },
        });

        // アクティビティログを記録
        await tx.activityLog.create({
          data: {
            userId,
            actionType: 'create',
            targetType: 'subscription',
            details: {
              action: 'create_payment_intent',
              planId,
              interval,
              amount: this.getPlanAmount(priceId),
            },
          },
        });

        return paymentIntent;
      });

      res.json({
        clientSecret: result.client_secret,
      });
    } catch (error) {
      await logError({
        userId: req.user?.id,
        type: 'payment_intent_creation_error',
        error,
        metadata: {
          priceId: req.body.priceId,
          planId: req.body.planId,
          interval: req.body.interval,
        },
      });
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  }
} 