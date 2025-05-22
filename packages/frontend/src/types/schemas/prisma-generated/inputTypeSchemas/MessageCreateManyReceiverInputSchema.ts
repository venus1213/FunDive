import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';

export const MessageCreateManyReceiverInputSchema: z.ZodType<Prisma.MessageCreateManyReceiverInput> = z.object({
  id: z.string().uuid().optional(),
  senderId: z.string(),
  projectId: z.string().optional().nullable(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export default MessageCreateManyReceiverInputSchema;
