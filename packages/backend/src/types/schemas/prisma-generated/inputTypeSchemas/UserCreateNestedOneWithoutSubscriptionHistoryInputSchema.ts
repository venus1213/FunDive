import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSubscriptionHistoryInputSchema } from './UserCreateWithoutSubscriptionHistoryInputSchema';
import { UserUncheckedCreateWithoutSubscriptionHistoryInputSchema } from './UserUncheckedCreateWithoutSubscriptionHistoryInputSchema';
import { UserCreateOrConnectWithoutSubscriptionHistoryInputSchema } from './UserCreateOrConnectWithoutSubscriptionHistoryInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutSubscriptionHistoryInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionHistoryInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionHistoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionHistoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutSubscriptionHistoryInputSchema;
