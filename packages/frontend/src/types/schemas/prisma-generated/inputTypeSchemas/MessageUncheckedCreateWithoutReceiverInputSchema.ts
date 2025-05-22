import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserUncheckedCreateNestedManyWithoutMentionedInMessagesInputSchema } from './UserUncheckedCreateNestedManyWithoutMentionedInMessagesInputSchema';

export const MessageUncheckedCreateWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutReceiverInput> = z.object({
  id: z.string().uuid().optional(),
  senderId: z.string(),
  projectId: z.string().optional().nullable(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional(),
  mentionedUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutMentionedInMessagesInputSchema).optional()
}).strict();

export default MessageUncheckedCreateWithoutReceiverInputSchema;
