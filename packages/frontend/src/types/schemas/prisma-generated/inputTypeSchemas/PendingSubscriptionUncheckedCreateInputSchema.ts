import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';

export const PendingSubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.PendingSubscriptionUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  planType: z.lazy(() => PlanTypeSchema),
  billingCycle: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default PendingSubscriptionUncheckedCreateInputSchema;
