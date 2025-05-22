import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const BookmarkScalarWhereInputSchema: z.ZodType<Prisma.BookmarkScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default BookmarkScalarWhereInputSchema;
