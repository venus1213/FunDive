import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';
import { NestedEnumPlanTypeWithAggregatesFilterSchema } from './NestedEnumPlanTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumPlanTypeFilterSchema } from './NestedEnumPlanTypeFilterSchema';

export const EnumPlanTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPlanTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlanTypeSchema).optional(),
  in: z.lazy(() => PlanTypeSchema).array().optional(),
  notIn: z.lazy(() => PlanTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => NestedEnumPlanTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlanTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlanTypeFilterSchema).optional()
}).strict();

export default EnumPlanTypeWithAggregatesFilterSchema;
