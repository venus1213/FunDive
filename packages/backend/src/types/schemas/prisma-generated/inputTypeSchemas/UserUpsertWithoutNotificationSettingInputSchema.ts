import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutNotificationSettingInputSchema } from './UserUpdateWithoutNotificationSettingInputSchema';
import { UserUncheckedUpdateWithoutNotificationSettingInputSchema } from './UserUncheckedUpdateWithoutNotificationSettingInputSchema';
import { UserCreateWithoutNotificationSettingInputSchema } from './UserCreateWithoutNotificationSettingInputSchema';
import { UserUncheckedCreateWithoutNotificationSettingInputSchema } from './UserUncheckedCreateWithoutNotificationSettingInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutNotificationSettingInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationSettingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationSettingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationSettingInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutNotificationSettingInputSchema;
