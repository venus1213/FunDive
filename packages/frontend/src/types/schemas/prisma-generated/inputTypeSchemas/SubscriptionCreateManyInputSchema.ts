import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';

export const SubscriptionCreateManyInputSchema: z.ZodType<Prisma.SubscriptionCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  status: z.lazy(() => SubscriptionStatusSchema),
  currentPeriodStart: z.coerce.date(),
  currentPeriodEnd: z.coerce.date(),
  cancelAtPeriodEnd: z.boolean().optional(),
  nextPlanPriceId: z.string().optional().nullable(),
  nextPlanStartDate: z.coerce.date().optional().nullable(),
  prorationAmount: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default SubscriptionCreateManyInputSchema;
