import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { PendingSubscriptionCountOrderByAggregateInputSchema } from './PendingSubscriptionCountOrderByAggregateInputSchema';
import { PendingSubscriptionMaxOrderByAggregateInputSchema } from './PendingSubscriptionMaxOrderByAggregateInputSchema';
import { PendingSubscriptionMinOrderByAggregateInputSchema } from './PendingSubscriptionMinOrderByAggregateInputSchema';

export const PendingSubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PendingSubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  planType: z.lazy(() => SortOrderSchema).optional(),
  billingCycle: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PendingSubscriptionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PendingSubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PendingSubscriptionMinOrderByAggregateInputSchema).optional()
}).strict();

export default PendingSubscriptionOrderByWithAggregationInputSchema;
