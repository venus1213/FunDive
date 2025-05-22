import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutPendingSubscriptionInputSchema } from './UserUpdateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedUpdateWithoutPendingSubscriptionInputSchema } from './UserUncheckedUpdateWithoutPendingSubscriptionInputSchema';

export const UserUpdateToOneWithWhereWithoutPendingSubscriptionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPendingSubscriptionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPendingSubscriptionInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutPendingSubscriptionInputSchema;
