import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumSubscriptionStatusFilterSchema } from './EnumSubscriptionStatusFilterSchema';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const SubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  stripeCustomerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripeSubscriptionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  currentPeriodStart: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  currentPeriodEnd: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cancelAtPeriodEnd: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  nextPlanPriceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextPlanStartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  prorationAmount: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default SubscriptionWhereUniqueInputSchema;
