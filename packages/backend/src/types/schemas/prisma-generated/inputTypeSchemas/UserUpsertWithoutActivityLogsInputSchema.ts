import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutActivityLogsInputSchema } from './UserUpdateWithoutActivityLogsInputSchema';
import { UserUncheckedUpdateWithoutActivityLogsInputSchema } from './UserUncheckedUpdateWithoutActivityLogsInputSchema';
import { UserCreateWithoutActivityLogsInputSchema } from './UserCreateWithoutActivityLogsInputSchema';
import { UserUncheckedCreateWithoutActivityLogsInputSchema } from './UserUncheckedCreateWithoutActivityLogsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutActivityLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutActivityLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActivityLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActivityLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutActivityLogsInputSchema;
