import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { NestedEnumSubscriptionStatusFilterSchema } from './NestedEnumSubscriptionStatusFilterSchema';

export const EnumSubscriptionStatusFilterSchema: z.ZodType<Prisma.EnumSubscriptionStatusFilter> = z.object({
  equals: z.lazy(() => SubscriptionStatusSchema).optional(),
  in: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => NestedEnumSubscriptionStatusFilterSchema) ]).optional(),
}).strict();

export default EnumSubscriptionStatusFilterSchema;
