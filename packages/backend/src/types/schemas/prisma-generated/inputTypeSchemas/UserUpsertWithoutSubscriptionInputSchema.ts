import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutSubscriptionInputSchema } from './UserUpdateWithoutSubscriptionInputSchema';
import { UserUncheckedUpdateWithoutSubscriptionInputSchema } from './UserUncheckedUpdateWithoutSubscriptionInputSchema';
import { UserCreateWithoutSubscriptionInputSchema } from './UserCreateWithoutSubscriptionInputSchema';
import { UserUncheckedCreateWithoutSubscriptionInputSchema } from './UserUncheckedCreateWithoutSubscriptionInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriptionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutSubscriptionInputSchema;
