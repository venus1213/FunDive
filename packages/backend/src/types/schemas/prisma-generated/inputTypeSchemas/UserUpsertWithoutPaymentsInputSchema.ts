import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutPaymentsInputSchema } from './UserUpdateWithoutPaymentsInputSchema';
import { UserUncheckedUpdateWithoutPaymentsInputSchema } from './UserUncheckedUpdateWithoutPaymentsInputSchema';
import { UserCreateWithoutPaymentsInputSchema } from './UserCreateWithoutPaymentsInputSchema';
import { UserUncheckedCreateWithoutPaymentsInputSchema } from './UserUncheckedCreateWithoutPaymentsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutPaymentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPaymentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPaymentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPaymentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutPaymentsInputSchema;
