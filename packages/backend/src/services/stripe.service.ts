import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

type CreateCheckoutSessionParams = {
  priceId?: string;
  quantity?: number;
  line_items?: Stripe.Checkout.SessionCreateParams.LineItem[];
} & Omit<Stripe.Checkout.SessionCreateParams, 'line_items'>;

interface SubscriptionUpdateParams {
  subscriptionId: string;
  data: {
    priceId?: string;
    metadata?: Stripe.MetadataParam;
    cancel_at_period_end?: boolean;
  };
}

export class StripeService {
  private stripe: Stripe;
  private prisma: PrismaClient;

  constructor(apiKey: string, prisma: PrismaClient) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-02-24.acacia',
    });
    this.prisma = prisma;
  }

  async createCheckoutSession(params: CreateCheckoutSessionParams) {
    try {
      const { priceId, quantity, ...rest } = params;
      const session = await this.stripe.checkout.sessions.create({
        ...rest,
        mode: params.mode || 'subscription',
        payment_method_types: params.payment_method_types || ['card'],
        line_items: params.line_items || [{
          price: priceId,
          quantity: quantity || 1,
        }],
      });

      return session;
    } catch (error) {
      logger.error('Failed to create checkout session', error);
      throw error;
    }
  }

  async retrieveSubscription(subscriptionId: string) {
    try {
      return await this.stripe.subscriptions.retrieve(subscriptionId);
    } catch (error) {
      logger.error('Failed to retrieve subscription', error);
      throw error;
    }
  }

  async retrieveProduct(productId: string) {
    try {
      return await this.stripe.products.retrieve(productId);
    } catch (error) {
      logger.error('Failed to retrieve product', error);
      throw error;
    }
  }

  async retrievePrice(priceId: string) {
    try {
      return await this.stripe.prices.retrieve(priceId);
    } catch (error) {
      logger.error('Failed to retrieve price', error);
      throw error;
    }
  }

  async listPrices(params: Stripe.PriceListParams) {
    try {
      return await this.stripe.prices.list(params);
    } catch (error) {
      logger.error('Failed to list prices', error);
      throw error;
    }
  }

  async updateSubscription({ subscriptionId, data }: SubscriptionUpdateParams) {
    try {
      return await this.stripe.subscriptions.update(
        subscriptionId,
        {
          items: data.priceId ? [{ price: data.priceId }] : undefined,
          metadata: data.metadata,
          cancel_at_period_end: data.cancel_at_period_end,
        }
      );
    } catch (error) {
      logger.error('Failed to update subscription', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      return await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
        metadata: {
          canceledAt: new Date().toISOString(),
          canceledBy: 'user'
        }
      });
    } catch (error) {
      logger.error('Failed to cancel subscription', error);
      throw error;
    }
  }

  async createPortalSession(customerId: string, returnUrl: string) {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });
      return session;
    } catch (error) {
      logger.error('Failed to create portal session', error);
      throw error;
    }
  }

  async retrieveCustomer(customerId: string) {
    try {
      return await this.stripe.customers.retrieve(customerId);
    } catch (error) {
      logger.error('Failed to retrieve customer', error);
      throw error;
    }
  }

  async createBillingPortalConfiguration(params: Stripe.BillingPortal.ConfigurationCreateParams) {
    try {
      return await this.stripe.billingPortal.configurations.create(params);
    } catch (error) {
      logger.error('Failed to create billing portal configuration', error);
      throw error;
    }
  }

  async createBillingPortalSession(params: Stripe.BillingPortal.SessionCreateParams) {
    try {
      return await this.stripe.billingPortal.sessions.create(params);
    } catch (error) {
      logger.error('Failed to create billing portal session', error);
      throw error;
    }
  }

  constructEvent(payload: string | Buffer, signature: string, webhookSecret: string) {
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
} 