import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutErrorLogsInputSchema } from './UserCreateWithoutErrorLogsInputSchema';
import { UserUncheckedCreateWithoutErrorLogsInputSchema } from './UserUncheckedCreateWithoutErrorLogsInputSchema';

export const UserCreateOrConnectWithoutErrorLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutErrorLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutErrorLogsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutErrorLogsInputSchema;
