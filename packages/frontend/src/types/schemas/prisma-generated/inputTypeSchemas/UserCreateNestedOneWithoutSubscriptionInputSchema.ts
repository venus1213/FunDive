import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSubscriptionInputSchema } from './UserCreateWithoutSubscriptionInputSchema';
import { UserUncheckedCreateWithoutSubscriptionInputSchema } from './UserUncheckedCreateWithoutSubscriptionInputSchema';
import { UserCreateOrConnectWithoutSubscriptionInputSchema } from './UserCreateOrConnectWithoutSubscriptionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutSubscriptionInputSchema;
