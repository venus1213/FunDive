import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const NotificationArchiveSelectSchema: z.ZodType<Prisma.NotificationArchiveSelect> = z.object({
  id: z.boolean().optional(),
  originalId: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  isRead: z.boolean().optional(),
  relatedId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  archivedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default NotificationArchiveSelectSchema;
