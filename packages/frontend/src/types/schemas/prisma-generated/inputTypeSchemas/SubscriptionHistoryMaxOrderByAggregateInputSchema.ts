import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionHistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  planName: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
  previousPlanType: z.lazy(() => SortOrderSchema).optional(),
  newPlanType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionHistoryMaxOrderByAggregateInputSchema;
