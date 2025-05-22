import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActionTypeSchema } from './ActionTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumActionTypeFilterSchema } from './NestedEnumActionTypeFilterSchema';

export const NestedEnumActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ActionTypeSchema).optional(),
  in: z.lazy(() => ActionTypeSchema).array().optional(),
  notIn: z.lazy(() => ActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => NestedEnumActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumActionTypeFilterSchema).optional()
}).strict();

export default NestedEnumActionTypeWithAggregatesFilterSchema;
