import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumProjectStatusFilterSchema } from './NestedEnumProjectStatusFilterSchema';

export const NestedEnumProjectStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumProjectStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional()
}).strict();

export default NestedEnumProjectStatusWithAggregatesFilterSchema;
