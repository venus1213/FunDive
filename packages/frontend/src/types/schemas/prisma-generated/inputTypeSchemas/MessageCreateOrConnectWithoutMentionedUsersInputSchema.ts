import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageCreateWithoutMentionedUsersInputSchema } from './MessageCreateWithoutMentionedUsersInputSchema';
import { MessageUncheckedCreateWithoutMentionedUsersInputSchema } from './MessageUncheckedCreateWithoutMentionedUsersInputSchema';

export const MessageCreateOrConnectWithoutMentionedUsersInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutMentionedUsersInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutMentionedUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutMentionedUsersInputSchema) ]),
}).strict();

export default MessageCreateOrConnectWithoutMentionedUsersInputSchema;
