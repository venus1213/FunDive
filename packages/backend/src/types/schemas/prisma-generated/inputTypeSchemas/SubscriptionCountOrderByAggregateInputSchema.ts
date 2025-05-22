import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
  currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
  cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
  nextPlanPriceId: z.lazy(() => SortOrderSchema).optional(),
  nextPlanStartDate: z.lazy(() => SortOrderSchema).optional(),
  prorationAmount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionCountOrderByAggregateInputSchema;
