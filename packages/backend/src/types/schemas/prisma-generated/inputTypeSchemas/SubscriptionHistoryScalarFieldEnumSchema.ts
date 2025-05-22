import { z } from 'zod';

export const SubscriptionHistoryScalarFieldEnumSchema = z.enum(['id','userId','planName','amount','status','stripeSubscriptionId','previousPlanType','newPlanType','metadata','createdAt','updatedAt']);

export default SubscriptionHistoryScalarFieldEnumSchema;
