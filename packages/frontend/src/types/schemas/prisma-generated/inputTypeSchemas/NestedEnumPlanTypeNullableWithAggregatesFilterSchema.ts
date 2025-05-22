import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedEnumPlanTypeNullableFilterSchema } from './NestedEnumPlanTypeNullableFilterSchema';

export const NestedEnumPlanTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPlanTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlanTypeSchema).optional().nullable(),
  in: z.lazy(() => PlanTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => PlanTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => NestedEnumPlanTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlanTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlanTypeNullableFilterSchema).optional()
}).strict();

export default NestedEnumPlanTypeNullableWithAggregatesFilterSchema;
