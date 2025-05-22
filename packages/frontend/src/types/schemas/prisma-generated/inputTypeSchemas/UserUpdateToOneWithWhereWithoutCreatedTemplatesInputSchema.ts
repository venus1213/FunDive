import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutCreatedTemplatesInputSchema } from './UserUpdateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedUpdateWithoutCreatedTemplatesInputSchema } from './UserUncheckedUpdateWithoutCreatedTemplatesInputSchema';

export const UserUpdateToOneWithWhereWithoutCreatedTemplatesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedTemplatesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedTemplatesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutCreatedTemplatesInputSchema;
