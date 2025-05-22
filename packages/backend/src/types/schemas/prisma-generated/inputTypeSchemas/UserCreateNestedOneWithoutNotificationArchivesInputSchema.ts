import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutNotificationArchivesInputSchema } from './UserCreateWithoutNotificationArchivesInputSchema';
import { UserUncheckedCreateWithoutNotificationArchivesInputSchema } from './UserUncheckedCreateWithoutNotificationArchivesInputSchema';
import { UserCreateOrConnectWithoutNotificationArchivesInputSchema } from './UserCreateOrConnectWithoutNotificationArchivesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutNotificationArchivesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationArchivesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationArchivesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationArchivesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationArchivesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutNotificationArchivesInputSchema;
