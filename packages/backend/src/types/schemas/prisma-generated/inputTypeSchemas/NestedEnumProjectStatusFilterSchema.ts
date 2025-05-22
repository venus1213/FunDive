import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStatusSchema } from './ProjectStatusSchema';

export const NestedEnumProjectStatusFilterSchema: z.ZodType<Prisma.NestedEnumProjectStatusFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumProjectStatusFilterSchema;
