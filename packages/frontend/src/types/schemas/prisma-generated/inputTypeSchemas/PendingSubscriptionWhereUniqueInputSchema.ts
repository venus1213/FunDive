import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PendingSubscriptionWhereInputSchema } from './PendingSubscriptionWhereInputSchema';
import { EnumPlanTypeFilterSchema } from './EnumPlanTypeFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const PendingSubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.PendingSubscriptionWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => PendingSubscriptionWhereInputSchema),z.lazy(() => PendingSubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PendingSubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PendingSubscriptionWhereInputSchema),z.lazy(() => PendingSubscriptionWhereInputSchema).array() ]).optional(),
  planType: z.union([ z.lazy(() => EnumPlanTypeFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  billingCycle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default PendingSubscriptionWhereUniqueInputSchema;
