import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingUpdateWithoutUserInputSchema } from './NotificationSettingUpdateWithoutUserInputSchema';
import { NotificationSettingUncheckedUpdateWithoutUserInputSchema } from './NotificationSettingUncheckedUpdateWithoutUserInputSchema';
import { NotificationSettingCreateWithoutUserInputSchema } from './NotificationSettingCreateWithoutUserInputSchema';
import { NotificationSettingUncheckedCreateWithoutUserInputSchema } from './NotificationSettingUncheckedCreateWithoutUserInputSchema';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';

export const NotificationSettingUpsertWithoutUserInputSchema: z.ZodType<Prisma.NotificationSettingUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => NotificationSettingUpdateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationSettingCreateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => NotificationSettingWhereInputSchema).optional()
}).strict();

export default NotificationSettingUpsertWithoutUserInputSchema;
