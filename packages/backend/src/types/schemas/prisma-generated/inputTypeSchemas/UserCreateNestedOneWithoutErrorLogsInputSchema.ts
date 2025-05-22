import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutErrorLogsInputSchema } from './UserCreateWithoutErrorLogsInputSchema';
import { UserUncheckedCreateWithoutErrorLogsInputSchema } from './UserUncheckedCreateWithoutErrorLogsInputSchema';
import { UserCreateOrConnectWithoutErrorLogsInputSchema } from './UserCreateOrConnectWithoutErrorLogsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutErrorLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutErrorLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutErrorLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutErrorLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutErrorLogsInputSchema;
