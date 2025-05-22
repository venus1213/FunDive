import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutNotificationSettingInputSchema } from './UserCreateWithoutNotificationSettingInputSchema';
import { UserUncheckedCreateWithoutNotificationSettingInputSchema } from './UserUncheckedCreateWithoutNotificationSettingInputSchema';
import { UserCreateOrConnectWithoutNotificationSettingInputSchema } from './UserCreateOrConnectWithoutNotificationSettingInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutNotificationSettingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationSettingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationSettingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationSettingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutNotificationSettingInputSchema;
