import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutPaymentsInputSchema } from './UserCreateWithoutPaymentsInputSchema';
import { UserUncheckedCreateWithoutPaymentsInputSchema } from './UserUncheckedCreateWithoutPaymentsInputSchema';

export const UserCreateOrConnectWithoutPaymentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPaymentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPaymentsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutPaymentsInputSchema;
