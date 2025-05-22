import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutProjectsInputSchema } from './UserUpdateWithoutProjectsInputSchema';
import { UserUncheckedUpdateWithoutProjectsInputSchema } from './UserUncheckedUpdateWithoutProjectsInputSchema';

export const UserUpdateToOneWithWhereWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProjectsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutProjectsInputSchema;
