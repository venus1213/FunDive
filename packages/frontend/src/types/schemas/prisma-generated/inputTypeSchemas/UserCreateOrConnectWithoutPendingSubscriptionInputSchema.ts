import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutPendingSubscriptionInputSchema } from './UserCreateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedCreateWithoutPendingSubscriptionInputSchema } from './UserUncheckedCreateWithoutPendingSubscriptionInputSchema';

export const UserCreateOrConnectWithoutPendingSubscriptionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPendingSubscriptionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingSubscriptionInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutPendingSubscriptionInputSchema;
