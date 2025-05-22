import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const BookmarkScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookmarkScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema),z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema),z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default BookmarkScalarWhereWithAggregatesInputSchema;
