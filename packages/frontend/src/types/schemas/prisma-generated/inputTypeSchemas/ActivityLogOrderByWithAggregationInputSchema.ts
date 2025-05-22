import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ActivityLogCountOrderByAggregateInputSchema } from './ActivityLogCountOrderByAggregateInputSchema';
import { ActivityLogMaxOrderByAggregateInputSchema } from './ActivityLogMaxOrderByAggregateInputSchema';
import { ActivityLogMinOrderByAggregateInputSchema } from './ActivityLogMinOrderByAggregateInputSchema';

export const ActivityLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActivityLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  details: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ActivityLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ActivityLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ActivityLogMinOrderByAggregateInputSchema).optional()
}).strict();

export default ActivityLogOrderByWithAggregationInputSchema;
