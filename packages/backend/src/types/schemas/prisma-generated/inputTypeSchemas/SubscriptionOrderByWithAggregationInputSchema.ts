import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { SubscriptionCountOrderByAggregateInputSchema } from './SubscriptionCountOrderByAggregateInputSchema';
import { SubscriptionAvgOrderByAggregateInputSchema } from './SubscriptionAvgOrderByAggregateInputSchema';
import { SubscriptionMaxOrderByAggregateInputSchema } from './SubscriptionMaxOrderByAggregateInputSchema';
import { SubscriptionMinOrderByAggregateInputSchema } from './SubscriptionMinOrderByAggregateInputSchema';
import { SubscriptionSumOrderByAggregateInputSchema } from './SubscriptionSumOrderByAggregateInputSchema';

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
  currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
  cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
  nextPlanPriceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextPlanStartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prorationAmount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscriptionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SubscriptionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscriptionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SubscriptionSumOrderByAggregateInputSchema).optional()
}).strict();

export default SubscriptionOrderByWithAggregationInputSchema;
