import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageCreateWithoutMentionedUsersInputSchema } from './MessageCreateWithoutMentionedUsersInputSchema';
import { MessageUncheckedCreateWithoutMentionedUsersInputSchema } from './MessageUncheckedCreateWithoutMentionedUsersInputSchema';
import { MessageCreateOrConnectWithoutMentionedUsersInputSchema } from './MessageCreateOrConnectWithoutMentionedUsersInputSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageUncheckedCreateNestedManyWithoutMentionedUsersInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutMentionedUsersInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutMentionedUsersInputSchema),z.lazy(() => MessageCreateWithoutMentionedUsersInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutMentionedUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutMentionedUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutMentionedUsersInputSchema),z.lazy(() => MessageCreateOrConnectWithoutMentionedUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedCreateNestedManyWithoutMentionedUsersInputSchema;
