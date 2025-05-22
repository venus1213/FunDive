import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const NotificationSettingWhereInputSchema: z.ZodType<Prisma.NotificationSettingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationSettingWhereInputSchema),z.lazy(() => NotificationSettingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationSettingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationSettingWhereInputSchema),z.lazy(() => NotificationSettingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  directMessageEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  projectMessageEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  mentionEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default NotificationSettingWhereInputSchema;
