import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumNotificationTypeFilterSchema } from './EnumNotificationTypeFilterSchema';
import { NotificationTypeSchema } from './NotificationTypeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const NotificationArchiveWhereInputSchema: z.ZodType<Prisma.NotificationArchiveWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationArchiveWhereInputSchema),z.lazy(() => NotificationArchiveWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationArchiveWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationArchiveWhereInputSchema),z.lazy(() => NotificationArchiveWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumNotificationTypeFilterSchema),z.lazy(() => NotificationTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isRead: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  relatedId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  archivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default NotificationArchiveWhereInputSchema;
