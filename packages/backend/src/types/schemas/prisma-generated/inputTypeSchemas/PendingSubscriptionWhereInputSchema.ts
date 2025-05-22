import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPlanTypeFilterSchema } from './EnumPlanTypeFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const PendingSubscriptionWhereInputSchema: z.ZodType<Prisma.PendingSubscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PendingSubscriptionWhereInputSchema),z.lazy(() => PendingSubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PendingSubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PendingSubscriptionWhereInputSchema),z.lazy(() => PendingSubscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  planType: z.union([ z.lazy(() => EnumPlanTypeFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  billingCycle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default PendingSubscriptionWhereInputSchema;
