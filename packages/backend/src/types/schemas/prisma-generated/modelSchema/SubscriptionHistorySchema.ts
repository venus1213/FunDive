import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { SubscriptionStatusSchema } from '../inputTypeSchemas/SubscriptionStatusSchema'
import { PlanTypeSchema } from '../inputTypeSchemas/PlanTypeSchema'

/////////////////////////////////////////
// SUBSCRIPTION HISTORY SCHEMA
/////////////////////////////////////////

export const SubscriptionHistorySchema = z.object({
  status: SubscriptionStatusSchema,
  previousPlanType: PlanTypeSchema.nullable(),
  newPlanType: PlanTypeSchema,
  id: z.string().cuid(),
  userId: z.string(),
  planName: z.string(),
  amount: z.number().int(),
  stripeSubscriptionId: z.string(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SubscriptionHistory = z.infer<typeof SubscriptionHistorySchema>

export default SubscriptionHistorySchema;
