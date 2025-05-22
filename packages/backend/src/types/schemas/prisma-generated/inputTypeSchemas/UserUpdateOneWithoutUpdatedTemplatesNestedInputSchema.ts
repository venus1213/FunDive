import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutUpdatedTemplatesInputSchema } from './UserCreateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedCreateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedCreateWithoutUpdatedTemplatesInputSchema';
import { UserCreateOrConnectWithoutUpdatedTemplatesInputSchema } from './UserCreateOrConnectWithoutUpdatedTemplatesInputSchema';
import { UserUpsertWithoutUpdatedTemplatesInputSchema } from './UserUpsertWithoutUpdatedTemplatesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutUpdatedTemplatesInputSchema } from './UserUpdateToOneWithWhereWithoutUpdatedTemplatesInputSchema';
import { UserUpdateWithoutUpdatedTemplatesInputSchema } from './UserUpdateWithoutUpdatedTemplatesInputSchema';
import { UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema } from './UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema';

export const UserUpdateOneWithoutUpdatedTemplatesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutUpdatedTemplatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedTemplatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUpdatedTemplatesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUpdatedTemplatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUpdateWithoutUpdatedTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUpdatedTemplatesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutUpdatedTemplatesNestedInputSchema;
