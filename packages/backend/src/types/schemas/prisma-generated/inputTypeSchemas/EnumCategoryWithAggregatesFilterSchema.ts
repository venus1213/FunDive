import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategorySchema } from './CategorySchema';
import { NestedEnumCategoryWithAggregatesFilterSchema } from './NestedEnumCategoryWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumCategoryFilterSchema } from './NestedEnumCategoryFilterSchema';

export const EnumCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCategoryWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CategorySchema).optional(),
  in: z.lazy(() => CategorySchema).array().optional(),
  notIn: z.lazy(() => CategorySchema).array().optional(),
  not: z.union([ z.lazy(() => CategorySchema),z.lazy(() => NestedEnumCategoryWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCategoryFilterSchema).optional()
}).strict();

export default EnumCategoryWithAggregatesFilterSchema;
