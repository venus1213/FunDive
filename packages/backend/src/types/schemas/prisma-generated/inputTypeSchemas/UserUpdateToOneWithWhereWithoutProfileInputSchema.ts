import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutProfileInputSchema } from './UserUpdateWithoutProfileInputSchema';
import { UserUncheckedUpdateWithoutProfileInputSchema } from './UserUncheckedUpdateWithoutProfileInputSchema';

export const UserUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutProfileInputSchema;
