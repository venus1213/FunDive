import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategorySchema } from './CategorySchema';

export const NestedEnumCategoryFilterSchema: z.ZodType<Prisma.NestedEnumCategoryFilter> = z.object({
  equals: z.lazy(() => CategorySchema).optional(),
  in: z.lazy(() => CategorySchema).array().optional(),
  notIn: z.lazy(() => CategorySchema).array().optional(),
  not: z.union([ z.lazy(() => CategorySchema),z.lazy(() => NestedEnumCategoryFilterSchema) ]).optional(),
}).strict();

export default NestedEnumCategoryFilterSchema;
