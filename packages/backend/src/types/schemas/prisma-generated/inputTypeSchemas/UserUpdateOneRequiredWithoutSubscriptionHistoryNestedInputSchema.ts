import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSubscriptionHistoryInputSchema } from './UserCreateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedCreateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedCreateWithoutSubscriptionHistoryInputSchema';
import { UserCreateOrConnectWithoutSubscriptionHistoryInputSchema } from './UserCreateOrConnectWithoutSubscriptionHistoryInputSchema';
import { UserUpsertWithoutSubscriptionHistoryInputSchema } from './UserUpsertWithoutSubscriptionHistoryInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutSubscriptionHistoryInputSchema } from './UserUpdateToOneWithWhereWithoutSubscriptionHistoryInputSchema';
import { UserUpdateWithoutSubscriptionHistoryInputSchema } from './UserUpdateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema';

export const UserUpdateOneRequiredWithoutSubscriptionHistoryNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionHistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionHistoryInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSubscriptionHistoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUpdateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutSubscriptionHistoryNestedInputSchema;
