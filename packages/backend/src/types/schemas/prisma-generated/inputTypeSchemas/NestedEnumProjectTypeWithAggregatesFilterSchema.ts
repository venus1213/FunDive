import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumProjectTypeFilterSchema } from './NestedEnumProjectTypeFilterSchema';

export const NestedEnumProjectTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumProjectTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProjectTypeSchema).optional(),
  in: z.lazy(() => ProjectTypeSchema).array().optional(),
  notIn: z.lazy(() => ProjectTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ProjectTypeSchema),z.lazy(() => NestedEnumProjectTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProjectTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProjectTypeFilterSchema).optional()
}).strict();

export default NestedEnumProjectTypeWithAggregatesFilterSchema;
