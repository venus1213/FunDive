import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumActionTypeFilterSchema } from './EnumActionTypeFilterSchema';
import { ActionTypeSchema } from './ActionTypeSchema';
import { EnumActivityTargetTypeFilterSchema } from './EnumActivityTargetTypeFilterSchema';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const ActivityLogWhereInputSchema: z.ZodType<Prisma.ActivityLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActivityLogWhereInputSchema),z.lazy(() => ActivityLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActivityLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActivityLogWhereInputSchema),z.lazy(() => ActivityLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  actionType: z.union([ z.lazy(() => EnumActionTypeFilterSchema),z.lazy(() => ActionTypeSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => EnumActivityTargetTypeFilterSchema),z.lazy(() => ActivityTargetTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  details: z.lazy(() => JsonNullableFilterSchema).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export default ActivityLogWhereInputSchema;
