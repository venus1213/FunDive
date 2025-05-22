import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedManyWithoutMentionedInMessagesInputSchema } from './UserCreateNestedManyWithoutMentionedInMessagesInputSchema';
import { UserCreateNestedOneWithoutSentMessagesInputSchema } from './UserCreateNestedOneWithoutSentMessagesInputSchema';
import { UserCreateNestedOneWithoutReceivedMessagesInputSchema } from './UserCreateNestedOneWithoutReceivedMessagesInputSchema';

export const MessageCreateWithoutProjectInputSchema: z.ZodType<Prisma.MessageCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional(),
  mentionedUsers: z.lazy(() => UserCreateNestedManyWithoutMentionedInMessagesInputSchema).optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  receiver: z.lazy(() => UserCreateNestedOneWithoutReceivedMessagesInputSchema)
}).strict();

export default MessageCreateWithoutProjectInputSchema;
