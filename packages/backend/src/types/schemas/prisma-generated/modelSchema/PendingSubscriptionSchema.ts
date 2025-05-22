import { z } from 'zod';
import { PlanTypeSchema } from '../inputTypeSchemas/PlanTypeSchema'

/////////////////////////////////////////
// PENDING SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const PendingSubscriptionSchema = z.object({
  planType: PlanTypeSchema,
  id: z.string(),
  userId: z.string(),
  billingCycle: z.string(),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PendingSubscription = z.infer<typeof PendingSubscriptionSchema>

export default PendingSubscriptionSchema;
