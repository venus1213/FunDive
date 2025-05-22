import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedManyWithoutMentionedInMessagesInputSchema } from './UserCreateNestedManyWithoutMentionedInMessagesInputSchema';
import { UserCreateNestedOneWithoutReceivedMessagesInputSchema } from './UserCreateNestedOneWithoutReceivedMessagesInputSchema';
import { ProjectCreateNestedOneWithoutMessagesInputSchema } from './ProjectCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateWithoutSenderInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional(),
  mentionedUsers: z.lazy(() => UserCreateNestedManyWithoutMentionedInMessagesInputSchema).optional(),
  receiver: z.lazy(() => UserCreateNestedOneWithoutReceivedMessagesInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutSenderInputSchema;
