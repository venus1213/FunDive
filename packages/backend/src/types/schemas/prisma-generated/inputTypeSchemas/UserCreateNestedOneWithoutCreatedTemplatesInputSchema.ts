import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutCreatedTemplatesInputSchema } from './UserCreateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutCreatedTemplatesInputSchema } from './UserUncheckedCreateWithoutCreatedTemplatesInputSchema';
import { UserCreateOrConnectWithoutCreatedTemplatesInputSchema } from './UserCreateOrConnectWithoutCreatedTemplatesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutCreatedTemplatesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedTemplatesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedTemplatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedTemplatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutCreatedTemplatesInputSchema;
