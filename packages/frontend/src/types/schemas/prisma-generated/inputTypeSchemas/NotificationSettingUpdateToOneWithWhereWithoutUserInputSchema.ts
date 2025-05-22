import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';
import { NotificationSettingUpdateWithoutUserInputSchema } from './NotificationSettingUpdateWithoutUserInputSchema';
import { NotificationSettingUncheckedUpdateWithoutUserInputSchema } from './NotificationSettingUncheckedUpdateWithoutUserInputSchema';

export const NotificationSettingUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NotificationSettingUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationSettingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NotificationSettingUpdateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default NotificationSettingUpdateToOneWithWhereWithoutUserInputSchema;
