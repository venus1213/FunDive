import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutActivityLogsInputSchema } from './UserUpdateWithoutActivityLogsInputSchema';
import { UserUncheckedUpdateWithoutActivityLogsInputSchema } from './UserUncheckedUpdateWithoutActivityLogsInputSchema';

export const UserUpdateToOneWithWhereWithoutActivityLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutActivityLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActivityLogsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutActivityLogsInputSchema;
