import { apiClient } from '../api';
import type { ApiResponse } from '@/types/api';
import { PlanType } from '@/types/user';

export interface SubscriptionInfo {
  subscription: {
    id: string;
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    stripeSubscriptionId: string;
    stripeCustomerId: string;
    interval: string;
    currentPeriodStart: string;
  } | null;
  planType: PlanType;
  isStale: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  currency: string;
  interval: string;
  stripePriceId: string;
  productId: string;
  intervalType: string;
  intervalCount: number;
}

export interface PortalSessionResponse {
  url: string;
}

export interface CheckoutSessionResponse {
  sessionUrl: string;
}

export type SubscriptionResponse = {
  success: boolean;
  subscription: {
    status: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  };
};

export const subscriptionApi = {
  getInfo: async () => {
    const response = await apiClient.get<SubscriptionInfo>('/subscriptions/info');
    return response;
  },

  getPlans: async () => {
    const response = await apiClient.get<Plan[]>('/subscriptions/plans');
    return response;
  },

  createPortalSession: async () => {
    const response = await apiClient.post<PortalSessionResponse>('/subscriptions/portal');
    return response;
  },

  changePlan: async (priceId: string): Promise<SubscriptionResponse> => {
    return apiClient.post('/subscriptions/change-plan', { priceId });
  },

  subscribe: async (planId: string) => {
    try {
      const response = await apiClient.post<{ sessionUrl: string }>('/subscriptions/subscribe', {
        priceId: planId,
        successUrl: `${window.location.origin}/settings/billing?status=success`,
        cancelUrl: `${window.location.origin}/settings/billing?status=canceled`
      });
      return response;
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  }
}; 