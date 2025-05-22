import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutPendingSubscriptionInputSchema } from './UserCreateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedCreateWithoutPendingSubscriptionInputSchema } from './UserUncheckedCreateWithoutPendingSubscriptionInputSchema';
import { UserCreateOrConnectWithoutPendingSubscriptionInputSchema } from './UserCreateOrConnectWithoutPendingSubscriptionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutPendingSubscriptionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPendingSubscriptionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPendingSubscriptionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutPendingSubscriptionInputSchema;
