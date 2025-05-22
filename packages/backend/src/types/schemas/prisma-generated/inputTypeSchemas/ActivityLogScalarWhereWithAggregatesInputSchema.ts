import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumActionTypeWithAggregatesFilterSchema } from './EnumActionTypeWithAggregatesFilterSchema';
import { ActionTypeSchema } from './ActionTypeSchema';
import { EnumActivityTargetTypeWithAggregatesFilterSchema } from './EnumActivityTargetTypeWithAggregatesFilterSchema';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ActivityLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActivityLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ActivityLogScalarWhereWithAggregatesInputSchema),z.lazy(() => ActivityLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActivityLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActivityLogScalarWhereWithAggregatesInputSchema),z.lazy(() => ActivityLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  actionType: z.union([ z.lazy(() => EnumActionTypeWithAggregatesFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => EnumActivityTargetTypeWithAggregatesFilterSchema),z.lazy(() => ActivityTargetTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  details: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ActivityLogScalarWhereWithAggregatesInputSchema;
