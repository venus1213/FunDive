import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutUpdatedTemplatesInputSchema } from './UserUpdateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema';
import { UserCreateWithoutUpdatedTemplatesInputSchema } from './UserCreateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedCreateWithoutUpdatedTemplatesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutUpdatedTemplatesInputSchema: z.ZodType<Prisma.UserUpsertWithoutUpdatedTemplatesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedTemplatesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutUpdatedTemplatesInputSchema;
