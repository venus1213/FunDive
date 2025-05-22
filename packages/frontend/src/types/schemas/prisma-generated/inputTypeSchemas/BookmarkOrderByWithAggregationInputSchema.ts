import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { BookmarkCountOrderByAggregateInputSchema } from './BookmarkCountOrderByAggregateInputSchema';
import { BookmarkMaxOrderByAggregateInputSchema } from './BookmarkMaxOrderByAggregateInputSchema';
import { BookmarkMinOrderByAggregateInputSchema } from './BookmarkMinOrderByAggregateInputSchema';

export const BookmarkOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookmarkOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookmarkCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookmarkMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookmarkMinOrderByAggregateInputSchema).optional()
}).strict();

export default BookmarkOrderByWithAggregationInputSchema;
