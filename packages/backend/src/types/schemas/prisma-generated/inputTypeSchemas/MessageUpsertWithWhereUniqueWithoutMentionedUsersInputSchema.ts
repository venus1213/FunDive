import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutMentionedUsersInputSchema } from './MessageUpdateWithoutMentionedUsersInputSchema';
import { MessageUncheckedUpdateWithoutMentionedUsersInputSchema } from './MessageUncheckedUpdateWithoutMentionedUsersInputSchema';
import { MessageCreateWithoutMentionedUsersInputSchema } from './MessageCreateWithoutMentionedUsersInputSchema';
import { MessageUncheckedCreateWithoutMentionedUsersInputSchema } from './MessageUncheckedCreateWithoutMentionedUsersInputSchema';

export const MessageUpsertWithWhereUniqueWithoutMentionedUsersInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutMentionedUsersInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutMentionedUsersInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutMentionedUsersInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutMentionedUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutMentionedUsersInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutMentionedUsersInputSchema;
