import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ActivityLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ActivityLogMinOrderByAggregateInputSchema;
