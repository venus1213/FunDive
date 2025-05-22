import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryWhereInputSchema } from './SubscriptionHistoryWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { EnumSubscriptionStatusFilterSchema } from './EnumSubscriptionStatusFilterSchema';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { EnumPlanTypeNullableFilterSchema } from './EnumPlanTypeNullableFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { EnumPlanTypeFilterSchema } from './EnumPlanTypeFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const SubscriptionHistoryWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionHistoryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SubscriptionHistoryWhereInputSchema),z.lazy(() => SubscriptionHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionHistoryWhereInputSchema),z.lazy(() => SubscriptionHistoryWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  planName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  previousPlanType: z.union([ z.lazy(() => EnumPlanTypeNullableFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional().nullable(),
  newPlanType: z.union([ z.lazy(() => EnumPlanTypeFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default SubscriptionHistoryWhereUniqueInputSchema;
