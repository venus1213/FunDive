import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutPendingSubscriptionInputSchema } from './UserUpdateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedUpdateWithoutPendingSubscriptionInputSchema } from './UserUncheckedUpdateWithoutPendingSubscriptionInputSchema';
import { UserCreateWithoutPendingSubscriptionInputSchema } from './UserCreateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedCreateWithoutPendingSubscriptionInputSchema } from './UserUncheckedCreateWithoutPendingSubscriptionInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutPendingSubscriptionInputSchema: z.ZodType<Prisma.UserUpsertWithoutPendingSubscriptionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPendingSubscriptionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingSubscriptionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutPendingSubscriptionInputSchema;
