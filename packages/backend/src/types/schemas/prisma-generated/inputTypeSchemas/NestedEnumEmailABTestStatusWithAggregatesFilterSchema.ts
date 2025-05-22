import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailABTestStatusFilterSchema } from './NestedEnumEmailABTestStatusFilterSchema';

export const NestedEnumEmailABTestStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEmailABTestStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailABTestStatusSchema).optional(),
  in: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailABTestStatusSchema),z.lazy(() => NestedEnumEmailABTestStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailABTestStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailABTestStatusFilterSchema).optional()
}).strict();

export default NestedEnumEmailABTestStatusWithAggregatesFilterSchema;
