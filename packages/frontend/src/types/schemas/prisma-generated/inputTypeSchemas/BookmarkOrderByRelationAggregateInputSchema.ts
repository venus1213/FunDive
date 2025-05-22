import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BookmarkOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BookmarkOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BookmarkOrderByRelationAggregateInputSchema;
