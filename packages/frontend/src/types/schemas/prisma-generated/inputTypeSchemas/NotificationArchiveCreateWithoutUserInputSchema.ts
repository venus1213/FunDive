import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationTypeSchema } from './NotificationTypeSchema';

export const NotificationArchiveCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationArchiveCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  originalId: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean().optional(),
  relatedId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  archivedAt: z.coerce.date().optional()
}).strict();

export default NotificationArchiveCreateWithoutUserInputSchema;
