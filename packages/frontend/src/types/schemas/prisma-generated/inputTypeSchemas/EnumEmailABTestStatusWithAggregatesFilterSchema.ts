import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { NestedEnumEmailABTestStatusWithAggregatesFilterSchema } from './NestedEnumEmailABTestStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailABTestStatusFilterSchema } from './NestedEnumEmailABTestStatusFilterSchema';

export const EnumEmailABTestStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEmailABTestStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailABTestStatusSchema).optional(),
  in: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailABTestStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailABTestStatusSchema),z.lazy(() => NestedEnumEmailABTestStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailABTestStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailABTestStatusFilterSchema).optional()
}).strict();

export default EnumEmailABTestStatusWithAggregatesFilterSchema;
