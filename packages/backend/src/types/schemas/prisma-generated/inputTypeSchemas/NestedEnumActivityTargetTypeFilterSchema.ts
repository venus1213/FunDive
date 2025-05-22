import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';

export const NestedEnumActivityTargetTypeFilterSchema: z.ZodType<Prisma.NestedEnumActivityTargetTypeFilter> = z.object({
  equals: z.lazy(() => ActivityTargetTypeSchema).optional(),
  in: z.lazy(() => ActivityTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => ActivityTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ActivityTargetTypeSchema),z.lazy(() => NestedEnumActivityTargetTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumActivityTargetTypeFilterSchema;
