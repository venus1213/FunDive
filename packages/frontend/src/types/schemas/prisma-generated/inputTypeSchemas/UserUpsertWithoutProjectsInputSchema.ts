import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutProjectsInputSchema } from './UserUpdateWithoutProjectsInputSchema';
import { UserUncheckedUpdateWithoutProjectsInputSchema } from './UserUncheckedUpdateWithoutProjectsInputSchema';
import { UserCreateWithoutProjectsInputSchema } from './UserCreateWithoutProjectsInputSchema';
import { UserUncheckedCreateWithoutProjectsInputSchema } from './UserUncheckedCreateWithoutProjectsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpsertWithoutProjectsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutProjectsInputSchema;
