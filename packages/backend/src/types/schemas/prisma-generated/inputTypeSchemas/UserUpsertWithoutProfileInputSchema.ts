import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutProfileInputSchema } from './UserUpdateWithoutProfileInputSchema';
import { UserUncheckedUpdateWithoutProfileInputSchema } from './UserUncheckedUpdateWithoutProfileInputSchema';
import { UserCreateWithoutProfileInputSchema } from './UserCreateWithoutProfileInputSchema';
import { UserUncheckedCreateWithoutProfileInputSchema } from './UserUncheckedCreateWithoutProfileInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutProfileInputSchema;
