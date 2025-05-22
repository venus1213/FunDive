import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { NestedEnumProjectTypeFilterSchema } from './NestedEnumProjectTypeFilterSchema';

export const EnumProjectTypeFilterSchema: z.ZodType<Prisma.EnumProjectTypeFilter> = z.object({
  equals: z.lazy(() => ProjectTypeSchema).optional(),
  in: z.lazy(() => ProjectTypeSchema).array().optional(),
  notIn: z.lazy(() => ProjectTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectTypeSchema),z.lazy(() => NestedEnumProjectTypeFilterSchema) ]).optional(),
}).strict();

export default EnumProjectTypeFilterSchema;
