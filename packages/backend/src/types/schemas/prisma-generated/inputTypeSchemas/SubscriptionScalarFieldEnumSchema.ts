import { z } from 'zod';

export const SubscriptionScalarFieldEnumSchema = z.enum(['id','userId','stripeCustomerId','stripeSubscriptionId','status','currentPeriodStart','currentPeriodEnd','cancelAtPeriodEnd','nextPlanPriceId','nextPlanStartDate','prorationAmount','createdAt','updatedAt']);

export default SubscriptionScalarFieldEnumSchema;
