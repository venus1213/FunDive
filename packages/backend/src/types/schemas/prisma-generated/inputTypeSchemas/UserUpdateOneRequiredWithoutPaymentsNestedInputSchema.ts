import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutPaymentsInputSchema } from './UserCreateWithoutPaymentsInputSchema';
import { UserUncheckedCreateWithoutPaymentsInputSchema } from './UserUncheckedCreateWithoutPaymentsInputSchema';
import { UserCreateOrConnectWithoutPaymentsInputSchema } from './UserCreateOrConnectWithoutPaymentsInputSchema';
import { UserUpsertWithoutPaymentsInputSchema } from './UserUpsertWithoutPaymentsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutPaymentsInputSchema } from './UserUpdateToOneWithWhereWithoutPaymentsInputSchema';
import { UserUpdateWithoutPaymentsInputSchema } from './UserUpdateWithoutPaymentsInputSchema';
import { UserUncheckedUpdateWithoutPaymentsInputSchema } from './UserUncheckedUpdateWithoutPaymentsInputSchema';

export const UserUpdateOneRequiredWithoutPaymentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPaymentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPaymentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPaymentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPaymentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPaymentsInputSchema),z.lazy(() => UserUpdateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPaymentsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutPaymentsNestedInputSchema;
