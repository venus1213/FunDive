import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationTypeSchema } from './NotificationTypeSchema';

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean().optional(),
  relatedId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export default NotificationCreateManyInputSchema;
