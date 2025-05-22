import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutReceivedMessagesInputSchema } from './UserCreateWithoutReceivedMessagesInputSchema';
import { UserUncheckedCreateWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { UserCreateOrConnectWithoutReceivedMessagesInputSchema } from './UserCreateOrConnectWithoutReceivedMessagesInputSchema';
import { UserUpsertWithoutReceivedMessagesInputSchema } from './UserUpsertWithoutReceivedMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema } from './UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema';
import { UserUpdateWithoutReceivedMessagesInputSchema } from './UserUpdateWithoutReceivedMessagesInputSchema';
import { UserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './UserUncheckedUpdateWithoutReceivedMessagesInputSchema';

export const UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReceivedMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReceivedMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema),z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema;
