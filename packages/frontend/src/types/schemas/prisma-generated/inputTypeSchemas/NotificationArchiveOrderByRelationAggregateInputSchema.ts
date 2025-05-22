import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const NotificationArchiveOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationArchiveOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default NotificationArchiveOrderByRelationAggregateInputSchema;
