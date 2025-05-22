import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const NotificationSettingWhereUniqueInputSchema: z.ZodType<Prisma.NotificationSettingWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => NotificationSettingWhereInputSchema),z.lazy(() => NotificationSettingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationSettingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationSettingWhereInputSchema),z.lazy(() => NotificationSettingWhereInputSchema).array() ]).optional(),
  emailEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  directMessageEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  projectMessageEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  mentionEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default NotificationSettingWhereUniqueInputSchema;
