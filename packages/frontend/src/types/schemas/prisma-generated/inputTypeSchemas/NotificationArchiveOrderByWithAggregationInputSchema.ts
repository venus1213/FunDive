import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { NotificationArchiveCountOrderByAggregateInputSchema } from './NotificationArchiveCountOrderByAggregateInputSchema';
import { NotificationArchiveMaxOrderByAggregateInputSchema } from './NotificationArchiveMaxOrderByAggregateInputSchema';
import { NotificationArchiveMinOrderByAggregateInputSchema } from './NotificationArchiveMinOrderByAggregateInputSchema';

export const NotificationArchiveOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationArchiveOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  originalId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  relatedId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationArchiveCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationArchiveMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationArchiveMinOrderByAggregateInputSchema).optional()
}).strict();

export default NotificationArchiveOrderByWithAggregationInputSchema;
