import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStageSchema } from './ProjectStageSchema';
import { NestedEnumProjectStageNullableWithAggregatesFilterSchema } from './NestedEnumProjectStageNullableWithAggregatesFilterSchema';
import { NestedIntNullableFilterSchema } from './NestedIntNullableFilterSchema';
import { NestedEnumProjectStageNullableFilterSchema } from './NestedEnumProjectStageNullableFilterSchema';

export const EnumProjectStageNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumProjectStageNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProjectStageSchema).optional().nullable(),
  in: z.lazy(() => ProjectStageSchema).array().optional().nullable(),
  notIn: z.lazy(() => ProjectStageSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ProjectStageSchema),z.lazy(() => NestedEnumProjectStageNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProjectStageNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProjectStageNullableFilterSchema).optional()
}).strict();

export default EnumProjectStageNullableWithAggregatesFilterSchema;
