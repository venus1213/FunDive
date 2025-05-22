import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkUserIdProjectIdCompoundUniqueInputSchema } from './BookmarkUserIdProjectIdCompoundUniqueInputSchema';
import { BookmarkWhereInputSchema } from './BookmarkWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProjectScalarRelationFilterSchema } from './ProjectScalarRelationFilterSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const BookmarkWhereUniqueInputSchema: z.ZodType<Prisma.BookmarkWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId_projectId: z.lazy(() => BookmarkUserIdProjectIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId_projectId: z.lazy(() => BookmarkUserIdProjectIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId_projectId: z.lazy(() => BookmarkUserIdProjectIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  project: z.union([ z.lazy(() => ProjectScalarRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
}).strict());

export default BookmarkWhereUniqueInputSchema;
