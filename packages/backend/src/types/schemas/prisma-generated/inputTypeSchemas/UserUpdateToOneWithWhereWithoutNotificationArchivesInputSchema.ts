import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutNotificationArchivesInputSchema } from './UserUpdateWithoutNotificationArchivesInputSchema';
import { UserUncheckedUpdateWithoutNotificationArchivesInputSchema } from './UserUncheckedUpdateWithoutNotificationArchivesInputSchema';

export const UserUpdateToOneWithWhereWithoutNotificationArchivesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationArchivesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationArchivesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutNotificationArchivesInputSchema;
