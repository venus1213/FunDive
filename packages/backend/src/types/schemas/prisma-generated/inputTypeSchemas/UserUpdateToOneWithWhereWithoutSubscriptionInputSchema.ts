import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutSubscriptionInputSchema } from './UserUpdateWithoutSubscriptionInputSchema';
import { UserUncheckedUpdateWithoutSubscriptionInputSchema } from './UserUncheckedUpdateWithoutSubscriptionInputSchema';

export const UserUpdateToOneWithWhereWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutSubscriptionInputSchema;
