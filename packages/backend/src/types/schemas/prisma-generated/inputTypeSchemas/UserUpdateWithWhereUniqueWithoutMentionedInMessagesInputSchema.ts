import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutMentionedInMessagesInputSchema } from './UserUpdateWithoutMentionedInMessagesInputSchema';
import { UserUncheckedUpdateWithoutMentionedInMessagesInputSchema } from './UserUncheckedUpdateWithoutMentionedInMessagesInputSchema';

export const UserUpdateWithWhereUniqueWithoutMentionedInMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutMentionedInMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMentionedInMessagesInputSchema) ]),
}).strict();

export default UserUpdateWithWhereUniqueWithoutMentionedInMessagesInputSchema;
