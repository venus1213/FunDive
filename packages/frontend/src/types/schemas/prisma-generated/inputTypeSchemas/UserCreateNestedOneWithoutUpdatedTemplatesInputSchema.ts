import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutUpdatedTemplatesInputSchema } from './UserCreateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedCreateWithoutUpdatedTemplatesInputSchema';
import { UserCreateOrConnectWithoutUpdatedTemplatesInputSchema } from './UserCreateOrConnectWithoutUpdatedTemplatesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutUpdatedTemplatesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUpdatedTemplatesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedTemplatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUpdatedTemplatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutUpdatedTemplatesInputSchema;
