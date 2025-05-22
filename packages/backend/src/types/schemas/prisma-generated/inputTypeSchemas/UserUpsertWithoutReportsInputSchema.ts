import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutReportsInputSchema } from './UserUpdateWithoutReportsInputSchema';
import { UserUncheckedUpdateWithoutReportsInputSchema } from './UserUncheckedUpdateWithoutReportsInputSchema';
import { UserCreateWithoutReportsInputSchema } from './UserCreateWithoutReportsInputSchema';
import { UserUncheckedCreateWithoutReportsInputSchema } from './UserUncheckedCreateWithoutReportsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutReportsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReportsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutReportsInputSchema;
