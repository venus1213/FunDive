import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutMentionedInMessagesInputSchema } from './UserCreateWithoutMentionedInMessagesInputSchema';
import { UserUncheckedCreateWithoutMentionedInMessagesInputSchema } from './UserUncheckedCreateWithoutMentionedInMessagesInputSchema';

export const UserCreateOrConnectWithoutMentionedInMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMentionedInMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMentionedInMessagesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutMentionedInMessagesInputSchema;
