import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutNotificationSettingInputSchema } from './UserCreateWithoutNotificationSettingInputSchema';
import { UserUncheckedCreateWithoutNotificationSettingInputSchema } from './UserUncheckedCreateWithoutNotificationSettingInputSchema';
import { UserCreateOrConnectWithoutNotificationSettingInputSchema } from './UserCreateOrConnectWithoutNotificationSettingInputSchema';
import { UserUpsertWithoutNotificationSettingInputSchema } from './UserUpsertWithoutNotificationSettingInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutNotificationSettingInputSchema } from './UserUpdateToOneWithWhereWithoutNotificationSettingInputSchema';
import { UserUpdateWithoutNotificationSettingInputSchema } from './UserUpdateWithoutNotificationSettingInputSchema';
import { UserUncheckedUpdateWithoutNotificationSettingInputSchema } from './UserUncheckedUpdateWithoutNotificationSettingInputSchema';

export const UserUpdateOneRequiredWithoutNotificationSettingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationSettingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationSettingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationSettingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationSettingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationSettingInputSchema),z.lazy(() => UserUpdateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationSettingInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutNotificationSettingNestedInputSchema;
