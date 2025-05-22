import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedOneWithoutSentMessagesInputSchema } from './UserCreateNestedOneWithoutSentMessagesInputSchema';
import { UserCreateNestedOneWithoutReceivedMessagesInputSchema } from './UserCreateNestedOneWithoutReceivedMessagesInputSchema';
import { ProjectCreateNestedOneWithoutMessagesInputSchema } from './ProjectCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutMentionedUsersInputSchema: z.ZodType<Prisma.MessageCreateWithoutMentionedUsersInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  receiver: z.lazy(() => UserCreateNestedOneWithoutReceivedMessagesInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutMentionedUsersInputSchema;
