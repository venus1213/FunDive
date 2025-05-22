import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleStatusSchema } from './ArticleStatusSchema';
import { NestedEnumArticleStatusWithAggregatesFilterSchema } from './NestedEnumArticleStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumArticleStatusFilterSchema } from './NestedEnumArticleStatusFilterSchema';

export const EnumArticleStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumArticleStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ArticleStatusSchema).optional(),
  in: z.lazy(() => ArticleStatusSchema).array().optional(),
  notIn: z.lazy(() => ArticleStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ArticleStatusSchema),z.lazy(() => NestedEnumArticleStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumArticleStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumArticleStatusFilterSchema).optional()
}).strict();

export default EnumArticleStatusWithAggregatesFilterSchema;
