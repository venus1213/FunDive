import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutNotificationArchivesInputSchema } from './UserCreateWithoutNotificationArchivesInputSchema';
import { UserUncheckedCreateWithoutNotificationArchivesInputSchema } from './UserUncheckedCreateWithoutNotificationArchivesInputSchema';

export const UserCreateOrConnectWithoutNotificationArchivesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationArchivesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationArchivesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutNotificationArchivesInputSchema;
