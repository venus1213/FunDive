import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumPlanTypeWithAggregatesFilterSchema } from './EnumPlanTypeWithAggregatesFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const PendingSubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PendingSubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PendingSubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => PendingSubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PendingSubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PendingSubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => PendingSubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  planType: z.union([ z.lazy(() => EnumPlanTypeWithAggregatesFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  billingCycle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default PendingSubscriptionScalarWhereWithAggregatesInputSchema;
