import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutCreatedTemplatesInputSchema } from './UserCreateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutCreatedTemplatesInputSchema } from './UserUncheckedCreateWithoutCreatedTemplatesInputSchema';
import { UserCreateOrConnectWithoutCreatedTemplatesInputSchema } from './UserCreateOrConnectWithoutCreatedTemplatesInputSchema';
import { UserUpsertWithoutCreatedTemplatesInputSchema } from './UserUpsertWithoutCreatedTemplatesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutCreatedTemplatesInputSchema } from './UserUpdateToOneWithWhereWithoutCreatedTemplatesInputSchema';
import { UserUpdateWithoutCreatedTemplatesInputSchema } from './UserUpdateWithoutCreatedTemplatesInputSchema';
import { UserUncheckedUpdateWithoutCreatedTemplatesInputSchema } from './UserUncheckedUpdateWithoutCreatedTemplatesInputSchema';

export const UserUpdateOneRequiredWithoutCreatedTemplatesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedTemplatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedTemplatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedTemplatesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedTemplatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUpdateWithoutCreatedTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedTemplatesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutCreatedTemplatesNestedInputSchema;
