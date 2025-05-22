import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';
import { NestedEnumPlanTypeNullableFilterSchema } from './NestedEnumPlanTypeNullableFilterSchema';

export const EnumPlanTypeNullableFilterSchema: z.ZodType<Prisma.EnumPlanTypeNullableFilter> = z.object({
  equals: z.lazy(() => PlanTypeSchema).optional().nullable(),
  in: z.lazy(() => PlanTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => PlanTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => NestedEnumPlanTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export default EnumPlanTypeNullableFilterSchema;
