import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutReceivedMessagesInputSchema } from './UserCreateWithoutReceivedMessagesInputSchema';
import { UserUncheckedCreateWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { UserCreateOrConnectWithoutReceivedMessagesInputSchema } from './UserCreateOrConnectWithoutReceivedMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReceivedMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutReceivedMessagesInputSchema;
