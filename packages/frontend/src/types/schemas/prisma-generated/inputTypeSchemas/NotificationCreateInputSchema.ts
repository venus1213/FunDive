import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationTypeSchema } from './NotificationTypeSchema';
import { UserCreateNestedOneWithoutNotificationsInputSchema } from './UserCreateNestedOneWithoutNotificationsInputSchema';

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean().optional(),
  relatedId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema)
}).strict();

export default NotificationCreateInputSchema;
