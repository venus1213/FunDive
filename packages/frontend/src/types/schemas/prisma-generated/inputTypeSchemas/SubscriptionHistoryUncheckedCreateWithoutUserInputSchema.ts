import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const SubscriptionHistoryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionHistoryUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  planName: z.string(),
  amount: z.number().int(),
  status: z.lazy(() => SubscriptionStatusSchema),
  stripeSubscriptionId: z.string(),
  previousPlanType: z.lazy(() => PlanTypeSchema).optional().nullable(),
  newPlanType: z.lazy(() => PlanTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default SubscriptionHistoryUncheckedCreateWithoutUserInputSchema;
