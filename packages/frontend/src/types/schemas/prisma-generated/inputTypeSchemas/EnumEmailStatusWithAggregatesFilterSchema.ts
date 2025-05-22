import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailStatusSchema } from './EmailStatusSchema';
import { NestedEnumEmailStatusWithAggregatesFilterSchema } from './NestedEnumEmailStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailStatusFilterSchema } from './NestedEnumEmailStatusFilterSchema';

export const EnumEmailStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEmailStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailStatusSchema).optional(),
  in: z.lazy(() => EmailStatusSchema).array().optional(),
  notIn: z.lazy(() => EmailStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailStatusSchema),z.lazy(() => NestedEnumEmailStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailStatusFilterSchema).optional()
}).strict();

export default EnumEmailStatusWithAggregatesFilterSchema;
