import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSubscriptionInputSchema } from './UserCreateWithoutSubscriptionInputSchema';
import { UserUncheckedCreateWithoutSubscriptionInputSchema } from './UserUncheckedCreateWithoutSubscriptionInputSchema';
import { UserCreateOrConnectWithoutSubscriptionInputSchema } from './UserCreateOrConnectWithoutSubscriptionInputSchema';
import { UserUpsertWithoutSubscriptionInputSchema } from './UserUpsertWithoutSubscriptionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutSubscriptionInputSchema } from './UserUpdateToOneWithWhereWithoutSubscriptionInputSchema';
import { UserUpdateWithoutSubscriptionInputSchema } from './UserUpdateWithoutSubscriptionInputSchema';
import { UserUncheckedUpdateWithoutSubscriptionInputSchema } from './UserUncheckedUpdateWithoutSubscriptionInputSchema';

export const UserUpdateOneRequiredWithoutSubscriptionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriptionInputSchema),z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutSubscriptionNestedInputSchema;
