import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationTypeSchema } from './NotificationTypeSchema';
import { UserCreateNestedOneWithoutNotificationArchivesInputSchema } from './UserCreateNestedOneWithoutNotificationArchivesInputSchema';

export const NotificationArchiveCreateInputSchema: z.ZodType<Prisma.NotificationArchiveCreateInput> = z.object({
  id: z.string().optional(),
  originalId: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean().optional(),
  relatedId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotificationArchivesInputSchema)
}).strict();

export default NotificationArchiveCreateInputSchema;
