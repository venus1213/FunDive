import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutErrorLogsInputSchema } from './UserUpdateWithoutErrorLogsInputSchema';
import { UserUncheckedUpdateWithoutErrorLogsInputSchema } from './UserUncheckedUpdateWithoutErrorLogsInputSchema';

export const UserUpdateToOneWithWhereWithoutErrorLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutErrorLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutErrorLogsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutErrorLogsInputSchema;
