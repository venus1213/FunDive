import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutMentionedInMessagesInputSchema } from './UserUpdateWithoutMentionedInMessagesInputSchema';
import { UserUncheckedUpdateWithoutMentionedInMessagesInputSchema } from './UserUncheckedUpdateWithoutMentionedInMessagesInputSchema';
import { UserCreateWithoutMentionedInMessagesInputSchema } from './UserCreateWithoutMentionedInMessagesInputSchema';
import { UserUncheckedCreateWithoutMentionedInMessagesInputSchema } from './UserUncheckedCreateWithoutMentionedInMessagesInputSchema';

export const UserUpsertWithWhereUniqueWithoutMentionedInMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutMentionedInMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMentionedInMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMentionedInMessagesInputSchema) ]),
}).strict();

export default UserUpsertWithWhereUniqueWithoutMentionedInMessagesInputSchema;
