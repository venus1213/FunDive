import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutNotificationSettingInputSchema } from './UserCreateWithoutNotificationSettingInputSchema';
import { UserUncheckedCreateWithoutNotificationSettingInputSchema } from './UserUncheckedCreateWithoutNotificationSettingInputSchema';

export const UserCreateOrConnectWithoutNotificationSettingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationSettingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationSettingInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutNotificationSettingInputSchema;
