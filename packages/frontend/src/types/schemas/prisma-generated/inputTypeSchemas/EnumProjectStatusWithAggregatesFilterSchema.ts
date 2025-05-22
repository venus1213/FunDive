import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { NestedEnumProjectStatusWithAggregatesFilterSchema } from './NestedEnumProjectStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumProjectStatusFilterSchema } from './NestedEnumProjectStatusFilterSchema';

export const EnumProjectStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumProjectStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProjectStatusSchema).optional(),
  in: z.lazy(() => ProjectStatusSchema).array().optional(),
  notIn: z.lazy(() => ProjectStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => NestedEnumProjectStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProjectStatusFilterSchema).optional()
}).strict();

export default EnumProjectStatusWithAggregatesFilterSchema;
