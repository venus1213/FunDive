import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';

export const PendingSubscriptionCreateWithoutUserInputSchema: z.ZodType<Prisma.PendingSubscriptionCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  planType: z.lazy(() => PlanTypeSchema),
  billingCycle: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default PendingSubscriptionCreateWithoutUserInputSchema;
