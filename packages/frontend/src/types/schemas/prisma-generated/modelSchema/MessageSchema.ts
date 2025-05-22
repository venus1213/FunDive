import { z } from 'zod';
import { MessageTypeSchema } from '../inputTypeSchemas/MessageTypeSchema'

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  messageType: MessageTypeSchema,
  id: z.string().uuid(),
  senderId: z.string(),
  receiverId: z.string(),
  projectId: z.string().nullable(),
  content: z.string(),
  isRead: z.boolean(),
  createdAt: z.coerce.date(),
})

export type Message = z.infer<typeof MessageSchema>

export default MessageSchema;
