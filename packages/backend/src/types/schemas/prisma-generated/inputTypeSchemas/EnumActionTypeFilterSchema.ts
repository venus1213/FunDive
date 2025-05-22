import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActionTypeSchema } from './ActionTypeSchema';
import { NestedEnumActionTypeFilterSchema } from './NestedEnumActionTypeFilterSchema';

export const EnumActionTypeFilterSchema: z.ZodType<Prisma.EnumActionTypeFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeFilterSchema) ]).optional(),
}).strict();

export default EnumActionTypeFilterSchema;
