import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';
import { NestedEnumPlanTypeFilterSchema } from './NestedEnumPlanTypeFilterSchema';

export const EnumPlanTypeFilterSchema: z.ZodType<Prisma.EnumPlanTypeFilter> = z.object({
  equals: z.lazy(() => PlanTypeSchema).optional(),
  in: z.lazy(() => PlanTypeSchema).array().optional(),
  notIn: z.lazy(() => PlanTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => NestedEnumPlanTypeFilterSchema) ]).optional(),
}).strict();

export default EnumPlanTypeFilterSchema;
