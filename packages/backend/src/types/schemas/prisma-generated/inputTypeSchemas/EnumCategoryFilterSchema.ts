import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategorySchema } from './CategorySchema';
import { NestedEnumCategoryFilterSchema } from './NestedEnumCategoryFilterSchema';

export const EnumCategoryFilterSchema: z.ZodType<Prisma.EnumCategoryFilter> = z.object({
  equals: z.lazy(() => CategorySchema).optional(),
  in: z.lazy(() => CategorySchema).array().optional(),
  notIn: z.lazy(() => CategorySchema).array().optional(),
  not: z.union([ z.lazy(() => CategorySchema),z.lazy(() => NestedEnumCategoryFilterSchema) ]).optional(),
}).strict();

export default EnumCategoryFilterSchema;
