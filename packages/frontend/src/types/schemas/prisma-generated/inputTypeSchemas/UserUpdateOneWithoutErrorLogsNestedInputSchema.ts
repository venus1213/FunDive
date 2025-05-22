import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutErrorLogsInputSchema } from './UserCreateWithoutErrorLogsInputSchema';
import { UserUncheckedCreateWithoutErrorLogsInputSchema } from './UserUncheckedCreateWithoutErrorLogsInputSchema';
import { UserCreateOrConnectWithoutErrorLogsInputSchema } from './UserCreateOrConnectWithoutErrorLogsInputSchema';
import { UserUpsertWithoutErrorLogsInputSchema } from './UserUpsertWithoutErrorLogsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutErrorLogsInputSchema } from './UserUpdateToOneWithWhereWithoutErrorLogsInputSchema';
import { UserUpdateWithoutErrorLogsInputSchema } from './UserUpdateWithoutErrorLogsInputSchema';
import { UserUncheckedUpdateWithoutErrorLogsInputSchema } from './UserUncheckedUpdateWithoutErrorLogsInputSchema';

export const UserUpdateOneWithoutErrorLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutErrorLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutErrorLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutErrorLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutErrorLogsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutErrorLogsInputSchema),z.lazy(() => UserUpdateWithoutErrorLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutErrorLogsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutErrorLogsNestedInputSchema;
