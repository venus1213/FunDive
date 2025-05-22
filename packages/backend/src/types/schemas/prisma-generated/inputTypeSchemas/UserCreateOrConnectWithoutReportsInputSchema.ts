import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutReportsInputSchema } from './UserCreateWithoutReportsInputSchema';
import { UserUncheckedCreateWithoutReportsInputSchema } from './UserUncheckedCreateWithoutReportsInputSchema';

export const UserCreateOrConnectWithoutReportsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReportsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutReportsInputSchema;
