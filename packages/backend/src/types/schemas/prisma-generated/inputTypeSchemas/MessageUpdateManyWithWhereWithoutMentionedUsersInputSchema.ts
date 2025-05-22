import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';
import { MessageUpdateManyMutationInputSchema } from './MessageUpdateManyMutationInputSchema';
import { MessageUncheckedUpdateManyWithoutMentionedUsersInputSchema } from './MessageUncheckedUpdateManyWithoutMentionedUsersInputSchema';

export const MessageUpdateManyWithWhereWithoutMentionedUsersInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutMentionedUsersInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutMentionedUsersInputSchema) ]),
}).strict();

export default MessageUpdateManyWithWhereWithoutMentionedUsersInputSchema;
