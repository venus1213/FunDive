import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedManyWithoutMentionedInMessagesInputSchema } from './UserCreateNestedManyWithoutMentionedInMessagesInputSchema';
import { UserCreateNestedOneWithoutSentMessagesInputSchema } from './UserCreateNestedOneWithoutSentMessagesInputSchema';
import { ProjectCreateNestedOneWithoutMessagesInputSchema } from './ProjectCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutReceiverInputSchema: z.ZodType<Prisma.MessageCreateWithoutReceiverInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  isRead: z.boolean().optional(),
  messageType: z.lazy(() => MessageTypeSchema),
  createdAt: z.coerce.date().optional(),
  mentionedUsers: z.lazy(() => UserCreateNestedManyWithoutMentionedInMessagesInputSchema).optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutReceiverInputSchema;
