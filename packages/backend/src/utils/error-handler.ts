import { Stripe } from 'stripe';

export const handleStripeError = (error: unknown) => {
  if (error instanceof Stripe.errors.StripeError) {
    return {
      status: 400,
      error: {
        code: error.code || 'STRIPE_ERROR',
        message: error.message || 'Stripeでの処理に失敗しました。',
        type: error.type,
        param: error.param,
      }
    };
  }
  return {
    status: 500,
    error: { 
      code: 'INTERNAL_ERROR', 
      message: '処理に失敗しました。' 
    }
  };
}; 