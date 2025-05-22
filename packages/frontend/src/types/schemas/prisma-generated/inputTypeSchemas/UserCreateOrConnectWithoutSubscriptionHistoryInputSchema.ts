import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutSubscriptionHistoryInputSchema } from './UserCreateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedCreateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedCreateWithoutSubscriptionHistoryInputSchema';

export const UserCreateOrConnectWithoutSubscriptionHistoryInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionHistoryInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionHistoryInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutSubscriptionHistoryInputSchema;
