import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { SubscriptionHistoryCountOrderByAggregateInputSchema } from './SubscriptionHistoryCountOrderByAggregateInputSchema';
import { SubscriptionHistoryAvgOrderByAggregateInputSchema } from './SubscriptionHistoryAvgOrderByAggregateInputSchema';
import { SubscriptionHistoryMaxOrderByAggregateInputSchema } from './SubscriptionHistoryMaxOrderByAggregateInputSchema';
import { SubscriptionHistoryMinOrderByAggregateInputSchema } from './SubscriptionHistoryMinOrderByAggregateInputSchema';
import { SubscriptionHistorySumOrderByAggregateInputSchema } from './SubscriptionHistorySumOrderByAggregateInputSchema';

export const SubscriptionHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionHistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  planName: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
  previousPlanType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  newPlanType: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscriptionHistoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SubscriptionHistoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscriptionHistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscriptionHistoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SubscriptionHistorySumOrderByAggregateInputSchema).optional()
}).strict();

export default SubscriptionHistoryOrderByWithAggregationInputSchema;
