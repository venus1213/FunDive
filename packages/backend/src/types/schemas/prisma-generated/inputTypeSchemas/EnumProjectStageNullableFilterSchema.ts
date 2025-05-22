import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStageSchema } from './ProjectStageSchema';
import { NestedEnumProjectStageNullableFilterSchema } from './NestedEnumProjectStageNullableFilterSchema';

export const EnumProjectStageNullableFilterSchema: z.ZodType<Prisma.EnumProjectStageNullableFilter> = z.object({
  equals: z.lazy(() => ProjectStageSchema).optional().nullable(),
  in: z.lazy(() => ProjectStageSchema).array().optional().nullable(),
  notIn: z.lazy(() => ProjectStageSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ProjectStageSchema),z.lazy(() => NestedEnumProjectStageNullableFilterSchema) ]).optional().nullable(),
}).strict();

export default EnumProjectStageNullableFilterSchema;
