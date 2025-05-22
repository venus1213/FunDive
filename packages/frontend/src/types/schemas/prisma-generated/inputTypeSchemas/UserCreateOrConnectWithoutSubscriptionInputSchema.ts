import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutSubscriptionInputSchema } from './UserCreateWithoutSubscriptionInputSchema';
import { UserUncheckedCreateWithoutSubscriptionInputSchema } from './UserUncheckedCreateWithoutSubscriptionInputSchema';

export const UserCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutSubscriptionInputSchema;
