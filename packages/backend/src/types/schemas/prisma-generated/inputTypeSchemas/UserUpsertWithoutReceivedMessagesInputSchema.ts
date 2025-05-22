import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutReceivedMessagesInputSchema } from './UserUpdateWithoutReceivedMessagesInputSchema';
import { UserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './UserUncheckedUpdateWithoutReceivedMessagesInputSchema';
import { UserCreateWithoutReceivedMessagesInputSchema } from './UserCreateWithoutReceivedMessagesInputSchema';
import { UserUncheckedCreateWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutReceivedMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutReceivedMessagesInputSchema;
