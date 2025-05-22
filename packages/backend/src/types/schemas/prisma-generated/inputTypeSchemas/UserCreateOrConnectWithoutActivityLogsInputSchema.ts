import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutActivityLogsInputSchema } from './UserCreateWithoutActivityLogsInputSchema';
import { UserUncheckedCreateWithoutActivityLogsInputSchema } from './UserUncheckedCreateWithoutActivityLogsInputSchema';

export const UserCreateOrConnectWithoutActivityLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutActivityLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActivityLogsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutActivityLogsInputSchema;
