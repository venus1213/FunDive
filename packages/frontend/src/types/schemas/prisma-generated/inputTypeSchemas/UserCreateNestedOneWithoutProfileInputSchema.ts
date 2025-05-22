import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutProfileInputSchema } from './UserCreateWithoutProfileInputSchema';
import { UserUncheckedCreateWithoutProfileInputSchema } from './UserUncheckedCreateWithoutProfileInputSchema';
import { UserCreateOrConnectWithoutProfileInputSchema } from './UserCreateOrConnectWithoutProfileInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutProfileInputSchema;
