import { z } from 'zod';

export const PendingSubscriptionScalarFieldEnumSchema = z.enum(['id','userId','planType','billingCycle','status','createdAt','updatedAt']);

export default PendingSubscriptionScalarFieldEnumSchema;
