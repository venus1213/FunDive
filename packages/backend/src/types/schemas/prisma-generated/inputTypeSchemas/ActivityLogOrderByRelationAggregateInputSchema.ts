import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ActivityLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ActivityLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ActivityLogOrderByRelationAggregateInputSchema;
