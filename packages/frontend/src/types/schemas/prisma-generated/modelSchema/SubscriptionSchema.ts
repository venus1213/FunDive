import { z } from 'zod';
import { SubscriptionStatusSchema } from '../inputTypeSchemas/SubscriptionStatusSchema'

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  status: SubscriptionStatusSchema,
  id: z.string().uuid(),
  userId: z.string(),
  stripeCustomerId: z.string().nullable(),
  stripeSubscriptionId: z.string().nullable(),
  currentPeriodStart: z.coerce.date(),
  currentPeriodEnd: z.coerce.date(),
  cancelAtPeriodEnd: z.boolean(),
  nextPlanPriceId: z.string().nullable(),
  nextPlanStartDate: z.coerce.date().nullable(),
  prorationAmount: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

export default SubscriptionSchema;
