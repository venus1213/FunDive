import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutPendingSubscriptionInputSchema } from './UserCreateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedCreateWithoutPendingSubscriptionInputSchema } from './UserUncheckedCreateWithoutPendingSubscriptionInputSchema';
import { UserCreateOrConnectWithoutPendingSubscriptionInputSchema } from './UserCreateOrConnectWithoutPendingSubscriptionInputSchema';
import { UserUpsertWithoutPendingSubscriptionInputSchema } from './UserUpsertWithoutPendingSubscriptionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutPendingSubscriptionInputSchema } from './UserUpdateToOneWithWhereWithoutPendingSubscriptionInputSchema';
import { UserUpdateWithoutPendingSubscriptionInputSchema } from './UserUpdateWithoutPendingSubscriptionInputSchema';
import { UserUncheckedUpdateWithoutPendingSubscriptionInputSchema } from './UserUncheckedUpdateWithoutPendingSubscriptionInputSchema';

export const UserUpdateOneRequiredWithoutPendingSubscriptionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPendingSubscriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPendingSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPendingSubscriptionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUpdateWithoutPendingSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPendingSubscriptionInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutPendingSubscriptionNestedInputSchema;
