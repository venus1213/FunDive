import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutReportsInputSchema } from './UserUpdateWithoutReportsInputSchema';
import { UserUncheckedUpdateWithoutReportsInputSchema } from './UserUncheckedUpdateWithoutReportsInputSchema';

export const UserUpdateToOneWithWhereWithoutReportsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReportsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutReportsInputSchema;
