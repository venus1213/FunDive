import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutPaymentsInputSchema } from './UserCreateWithoutPaymentsInputSchema';
import { UserUncheckedCreateWithoutPaymentsInputSchema } from './UserUncheckedCreateWithoutPaymentsInputSchema';
import { UserCreateOrConnectWithoutPaymentsInputSchema } from './UserCreateOrConnectWithoutPaymentsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutPaymentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPaymentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPaymentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPaymentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPaymentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutPaymentsInputSchema;
