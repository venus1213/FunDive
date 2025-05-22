import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';

export const PendingSubscriptionCreateManyInputSchema: z.ZodType<Prisma.PendingSubscriptionCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  planType: z.lazy(() => PlanTypeSchema),
  billingCycle: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default PendingSubscriptionCreateManyInputSchema;
