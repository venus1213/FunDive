import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutReportsInputSchema } from './UserCreateWithoutReportsInputSchema';
import { UserUncheckedCreateWithoutReportsInputSchema } from './UserUncheckedCreateWithoutReportsInputSchema';
import { UserCreateOrConnectWithoutReportsInputSchema } from './UserCreateOrConnectWithoutReportsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutReportsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReportsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutReportsInputSchema;
