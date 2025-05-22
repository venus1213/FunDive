import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutMentionedInMessagesInputSchema } from './UserCreateWithoutMentionedInMessagesInputSchema';
import { UserUncheckedCreateWithoutMentionedInMessagesInputSchema } from './UserUncheckedCreateWithoutMentionedInMessagesInputSchema';
import { UserCreateOrConnectWithoutMentionedInMessagesInputSchema } from './UserCreateOrConnectWithoutMentionedInMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedManyWithoutMentionedInMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutMentionedInMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserCreateWithoutMentionedInMessagesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutMentionedInMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutMentionedInMessagesInputSchema),z.lazy(() => UserCreateOrConnectWithoutMentionedInMessagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserCreateNestedManyWithoutMentionedInMessagesInputSchema;
