import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutUpdatedTemplatesInputSchema } from './UserUpdateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema';

export const UserUpdateToOneWithWhereWithoutUpdatedTemplatesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUpdatedTemplatesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutUpdatedTemplatesInputSchema;
