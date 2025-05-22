import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumArticleStatusFilterSchema } from './EnumArticleStatusFilterSchema';
import { ArticleStatusSchema } from './ArticleStatusSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const ArticleWhereUniqueInputSchema: z.ZodType<Prisma.ArticleWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumArticleStatusFilterSchema),z.lazy(() => ArticleStatusSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default ArticleWhereUniqueInputSchema;
