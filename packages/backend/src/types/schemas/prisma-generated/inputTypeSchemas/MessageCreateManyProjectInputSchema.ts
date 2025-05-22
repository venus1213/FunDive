import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';

export const MessageCreateManyProjectInputSchema: z.ZodType<Prisma.MessageCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export default MessageCreateManyProjectInputSchema;
