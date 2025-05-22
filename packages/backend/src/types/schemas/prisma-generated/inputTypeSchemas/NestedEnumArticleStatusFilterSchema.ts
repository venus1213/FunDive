import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleStatusSchema } from './ArticleStatusSchema';

export const NestedEnumArticleStatusFilterSchema: z.ZodType<Prisma.NestedEnumArticleStatusFilter> = z.object({
  equals: z.lazy(() => ArticleStatusSchema).optional(),
  in: z.lazy(() => ArticleStatusSchema).array().optional(),
  notIn: z.lazy(() => ArticleStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ArticleStatusSchema),z.lazy(() => NestedEnumArticleStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumArticleStatusFilterSchema;
