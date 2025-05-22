import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStageSchema } from './ProjectStageSchema';

export const NestedEnumProjectStageNullableFilterSchema: z.ZodType<Prisma.NestedEnumProjectStageNullableFilter> = z.object({
  equals: z.lazy(() => ProjectStageSchema).optional().nullable(),
  in: z.lazy(() => ProjectStageSchema).array().optional().nullable(),
  notIn: z.lazy(() => ProjectStageSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ProjectStageSchema),z.lazy(() => NestedEnumProjectStageNullableFilterSchema) ]).optional().nullable(),
}).strict();

export default NestedEnumProjectStageNullableFilterSchema;
