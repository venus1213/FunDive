import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { EnumSubscriptionStatusWithAggregatesFilterSchema } from './EnumSubscriptionStatusWithAggregatesFilterSchema';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { EnumPlanTypeNullableWithAggregatesFilterSchema } from './EnumPlanTypeNullableWithAggregatesFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { EnumPlanTypeWithAggregatesFilterSchema } from './EnumPlanTypeWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const SubscriptionHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriptionHistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  planName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusWithAggregatesFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  previousPlanType: z.union([ z.lazy(() => EnumPlanTypeNullableWithAggregatesFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional().nullable(),
  newPlanType: z.union([ z.lazy(() => EnumPlanTypeWithAggregatesFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default SubscriptionHistoryScalarWhereWithAggregatesInputSchema;
