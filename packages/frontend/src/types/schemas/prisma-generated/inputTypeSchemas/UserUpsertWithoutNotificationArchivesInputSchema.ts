import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutNotificationArchivesInputSchema } from './UserUpdateWithoutNotificationArchivesInputSchema';
import { UserUncheckedUpdateWithoutNotificationArchivesInputSchema } from './UserUncheckedUpdateWithoutNotificationArchivesInputSchema';
import { UserCreateWithoutNotificationArchivesInputSchema } from './UserCreateWithoutNotificationArchivesInputSchema';
import { UserUncheckedCreateWithoutNotificationArchivesInputSchema } from './UserUncheckedCreateWithoutNotificationArchivesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutNotificationArchivesInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationArchivesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationArchivesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationArchivesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutNotificationArchivesInputSchema;
