import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const NotificationArchiveCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationArchiveCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  originalId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  relatedId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  archivedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default NotificationArchiveCountOrderByAggregateInputSchema;
