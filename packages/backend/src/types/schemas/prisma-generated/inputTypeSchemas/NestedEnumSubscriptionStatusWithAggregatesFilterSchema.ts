import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumSubscriptionStatusFilterSchema } from './NestedEnumSubscriptionStatusFilterSchema';

export const NestedEnumSubscriptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSubscriptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStatusSchema).optional(),
  in: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => NestedEnumSubscriptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStatusFilterSchema).optional()
}).strict();

export default NestedEnumSubscriptionStatusWithAggregatesFilterSchema;
