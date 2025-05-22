import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutUpdatedTemplatesInputSchema } from './UserCreateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedCreateWithoutUpdatedTemplatesInputSchema';

export const UserCreateOrConnectWithoutUpdatedTemplatesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUpdatedTemplatesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedTemplatesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutUpdatedTemplatesInputSchema;
