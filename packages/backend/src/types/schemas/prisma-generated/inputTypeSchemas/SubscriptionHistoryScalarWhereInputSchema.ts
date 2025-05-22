import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { EnumSubscriptionStatusFilterSchema } from './EnumSubscriptionStatusFilterSchema';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { EnumPlanTypeNullableFilterSchema } from './EnumPlanTypeNullableFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { EnumPlanTypeFilterSchema } from './EnumPlanTypeFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const SubscriptionHistoryScalarWhereInputSchema: z.ZodType<Prisma.SubscriptionHistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionHistoryScalarWhereInputSchema),z.lazy(() => SubscriptionHistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionHistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionHistoryScalarWhereInputSchema),z.lazy(() => SubscriptionHistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  planName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  previousPlanType: z.union([ z.lazy(() => EnumPlanTypeNullableFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional().nullable(),
  newPlanType: z.union([ z.lazy(() => EnumPlanTypeFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default SubscriptionHistoryScalarWhereInputSchema;
