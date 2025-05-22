import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutMentionedUsersInputSchema } from './MessageUpdateWithoutMentionedUsersInputSchema';
import { MessageUncheckedUpdateWithoutMentionedUsersInputSchema } from './MessageUncheckedUpdateWithoutMentionedUsersInputSchema';

export const MessageUpdateWithWhereUniqueWithoutMentionedUsersInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutMentionedUsersInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutMentionedUsersInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutMentionedUsersInputSchema) ]),
}).strict();

export default MessageUpdateWithWhereUniqueWithoutMentionedUsersInputSchema;
