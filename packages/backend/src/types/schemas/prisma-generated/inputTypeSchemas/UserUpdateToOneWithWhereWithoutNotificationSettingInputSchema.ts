import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutNotificationSettingInputSchema } from './UserUpdateWithoutNotificationSettingInputSchema';
import { UserUncheckedUpdateWithoutNotificationSettingInputSchema } from './UserUncheckedUpdateWithoutNotificationSettingInputSchema';

export const UserUpdateToOneWithWhereWithoutNotificationSettingInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationSettingInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotificationSettingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationSettingInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutNotificationSettingInputSchema;
