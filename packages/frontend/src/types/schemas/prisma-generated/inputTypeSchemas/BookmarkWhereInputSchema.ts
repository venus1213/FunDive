import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProjectScalarRelationFilterSchema } from './ProjectScalarRelationFilterSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const BookmarkWhereInputSchema: z.ZodType<Prisma.BookmarkWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict();

export default BookmarkWhereInputSchema;
