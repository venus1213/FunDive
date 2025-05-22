import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutCreatedTemplatesInputSchema } from './UserCreateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutCreatedTemplatesInputSchema } from './UserUncheckedCreateWithoutCreatedTemplatesInputSchema';

export const UserCreateOrConnectWithoutCreatedTemplatesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedTemplatesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedTemplatesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutCreatedTemplatesInputSchema;
