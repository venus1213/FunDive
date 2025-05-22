import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutSubscriptionHistoryInputSchema } from './UserUpdateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema';
import { UserCreateWithoutSubscriptionHistoryInputSchema } from './UserCreateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedCreateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedCreateWithoutSubscriptionHistoryInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSubscriptionHistoryInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriptionHistoryInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionHistoryInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionHistoryInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutSubscriptionHistoryInputSchema;
