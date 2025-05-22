import { z } from 'zod';
import { NotificationTypeSchema } from '../inputTypeSchemas/NotificationTypeSchema'

/////////////////////////////////////////
// NOTIFICATION ARCHIVE SCHEMA
/////////////////////////////////////////

export const NotificationArchiveSchema = z.object({
  type: NotificationTypeSchema,
  id: z.string().uuid(),
  originalId: z.string(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  relatedId: z.string().nullable(),
  createdAt: z.coerce.date(),
  archivedAt: z.coerce.date(),
})

export type NotificationArchive = z.infer<typeof NotificationArchiveSchema>

export default NotificationArchiveSchema;
