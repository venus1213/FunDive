import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';
import { UserCreateNestedOneWithoutPendingSubscriptionInputSchema } from './UserCreateNestedOneWithoutPendingSubscriptionInputSchema';

export const PendingSubscriptionCreateInputSchema: z.ZodType<Prisma.PendingSubscriptionCreateInput> = z.object({
  id: z.string().optional(),
  planType: z.lazy(() => PlanTypeSchema),
  billingCycle: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPendingSubscriptionInputSchema)
}).strict();

export default PendingSubscriptionCreateInputSchema;
