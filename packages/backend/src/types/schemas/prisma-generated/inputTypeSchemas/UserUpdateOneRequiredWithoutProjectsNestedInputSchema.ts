import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutProjectsInputSchema } from './UserCreateWithoutProjectsInputSchema';
import { UserUncheckedCreateWithoutProjectsInputSchema } from './UserUncheckedCreateWithoutProjectsInputSchema';
import { UserCreateOrConnectWithoutProjectsInputSchema } from './UserCreateOrConnectWithoutProjectsInputSchema';
import { UserUpsertWithoutProjectsInputSchema } from './UserUpsertWithoutProjectsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutProjectsInputSchema } from './UserUpdateToOneWithWhereWithoutProjectsInputSchema';
import { UserUpdateWithoutProjectsInputSchema } from './UserUpdateWithoutProjectsInputSchema';
import { UserUncheckedUpdateWithoutProjectsInputSchema } from './UserUncheckedUpdateWithoutProjectsInputSchema';

export const UserUpdateOneRequiredWithoutProjectsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProjectsInputSchema),z.lazy(() => UserUpdateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutProjectsNestedInputSchema;
