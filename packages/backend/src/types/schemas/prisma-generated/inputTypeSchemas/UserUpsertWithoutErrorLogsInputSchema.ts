import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutErrorLogsInputSchema } from './UserUpdateWithoutErrorLogsInputSchema';
import { UserUncheckedUpdateWithoutErrorLogsInputSchema } from './UserUncheckedUpdateWithoutErrorLogsInputSchema';
import { UserCreateWithoutErrorLogsInputSchema } from './UserCreateWithoutErrorLogsInputSchema';
import { UserUncheckedCreateWithoutErrorLogsInputSchema } from './UserUncheckedCreateWithoutErrorLogsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutErrorLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutErrorLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutErrorLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutErrorLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutErrorLogsInputSchema;
