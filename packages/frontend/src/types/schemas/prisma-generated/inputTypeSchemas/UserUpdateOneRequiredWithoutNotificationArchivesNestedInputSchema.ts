import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutNotificationArchivesInputSchema } from './UserCreateWithoutNotificationArchivesInputSchema';
import { UserUncheckedCreateWithoutNotificationArchivesInputSchema } from './UserUncheckedCreateWithoutNotificationArchivesInputSchema';
import { UserCreateOrConnectWithoutNotificationArchivesInputSchema } from './UserCreateOrConnectWithoutNotificationArchivesInputSchema';
import { UserUpsertWithoutNotificationArchivesInputSchema } from './UserUpsertWithoutNotificationArchivesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutNotificationArchivesInputSchema } from './UserUpdateToOneWithWhereWithoutNotificationArchivesInputSchema';
import { UserUpdateWithoutNotificationArchivesInputSchema } from './UserUpdateWithoutNotificationArchivesInputSchema';
import { UserUncheckedUpdateWithoutNotificationArchivesInputSchema } from './UserUncheckedUpdateWithoutNotificationArchivesInputSchema';

export const UserUpdateOneRequiredWithoutNotificationArchivesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationArchivesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationArchivesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationArchivesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationArchivesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationArchivesInputSchema),z.lazy(() => UserUpdateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationArchivesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutNotificationArchivesNestedInputSchema;
