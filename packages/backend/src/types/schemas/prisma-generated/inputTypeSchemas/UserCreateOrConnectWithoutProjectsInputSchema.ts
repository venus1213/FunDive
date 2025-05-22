import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutProjectsInputSchema } from './UserCreateWithoutProjectsInputSchema';
import { UserUncheckedCreateWithoutProjectsInputSchema } from './UserUncheckedCreateWithoutProjectsInputSchema';

export const UserCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProjectsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutProjectsInputSchema;
