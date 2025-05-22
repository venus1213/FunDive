import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActionTypeSchema } from './ActionTypeSchema';

export const NestedEnumActionTypeFilterSchema: z.ZodType<Prisma.NestedEnumActionTypeFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumActionTypeFilterSchema;
