import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutCreatedTemplatesInputSchema } from './UserUpdateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedUpdateWithoutCreatedTemplatesInputSchema } from './UserUncheckedUpdateWithoutCreatedTemplatesInputSchema';
import { UserCreateWithoutCreatedTemplatesInputSchema } from './UserCreateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutCreatedTemplatesInputSchema } from './UserUncheckedCreateWithoutCreatedTemplatesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutCreatedTemplatesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedTemplatesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedTemplatesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedTemplatesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutCreatedTemplatesInputSchema;
