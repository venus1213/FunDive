import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutActivityLogsInputSchema } from './UserCreateWithoutActivityLogsInputSchema';
import { UserUncheckedCreateWithoutActivityLogsInputSchema } from './UserUncheckedCreateWithoutActivityLogsInputSchema';
import { UserCreateOrConnectWithoutActivityLogsInputSchema } from './UserCreateOrConnectWithoutActivityLogsInputSchema';
import { UserUpsertWithoutActivityLogsInputSchema } from './UserUpsertWithoutActivityLogsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutActivityLogsInputSchema } from './UserUpdateToOneWithWhereWithoutActivityLogsInputSchema';
import { UserUpdateWithoutActivityLogsInputSchema } from './UserUpdateWithoutActivityLogsInputSchema';
import { UserUncheckedUpdateWithoutActivityLogsInputSchema } from './UserUncheckedUpdateWithoutActivityLogsInputSchema';

export const UserUpdateOneWithoutActivityLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutActivityLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActivityLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutActivityLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutActivityLogsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutActivityLogsInputSchema),z.lazy(() => UserUpdateWithoutActivityLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActivityLogsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutActivityLogsNestedInputSchema;
