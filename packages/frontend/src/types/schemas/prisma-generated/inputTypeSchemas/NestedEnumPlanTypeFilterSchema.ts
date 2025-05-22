import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';

export const NestedEnumPlanTypeFilterSchema: z.ZodType<Prisma.NestedEnumPlanTypeFilter> = z.object({
  equals: z.lazy(() => PlanTypeSchema).optional(),
  in: z.lazy(() => PlanTypeSchema).array().optional(),
  notIn: z.lazy(() => PlanTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => NestedEnumPlanTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumPlanTypeFilterSchema;
