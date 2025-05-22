import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumActivityTargetTypeFilterSchema } from './NestedEnumActivityTargetTypeFilterSchema';

export const NestedEnumActivityTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumActivityTargetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ActivityTargetTypeSchema).optional(),
  in: z.lazy(() => ActivityTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => ActivityTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActivityTargetTypeSchema),z.lazy(() => NestedEnumActivityTargetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumActivityTargetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumActivityTargetTypeFilterSchema).optional()
}).strict();

export default NestedEnumActivityTargetTypeWithAggregatesFilterSchema;
