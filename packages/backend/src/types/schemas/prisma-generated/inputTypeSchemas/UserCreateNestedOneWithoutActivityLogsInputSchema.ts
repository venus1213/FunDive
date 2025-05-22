import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutActivityLogsInputSchema } from './UserCreateWithoutActivityLogsInputSchema';
import { UserUncheckedCreateWithoutActivityLogsInputSchema } from './UserUncheckedCreateWithoutActivityLogsInputSchema';
import { UserCreateOrConnectWithoutActivityLogsInputSchema } from './UserCreateOrConnectWithoutActivityLogsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutActivityLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutActivityLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActivityLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutActivityLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutActivityLogsInputSchema;
