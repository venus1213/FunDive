import { z } from 'zod';
import { NotificationTypeSchema } from '../inputTypeSchemas/NotificationTypeSchema'

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  type: NotificationTypeSchema,
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  relatedId: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type Notification = z.infer<typeof NotificationSchema>

export default NotificationSchema;
