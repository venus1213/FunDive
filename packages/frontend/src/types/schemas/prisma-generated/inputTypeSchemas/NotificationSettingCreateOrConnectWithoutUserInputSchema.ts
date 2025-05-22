import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingWhereUniqueInputSchema } from './NotificationSettingWhereUniqueInputSchema';
import { NotificationSettingCreateWithoutUserInputSchema } from './NotificationSettingCreateWithoutUserInputSchema';
import { NotificationSettingUncheckedCreateWithoutUserInputSchema } from './NotificationSettingUncheckedCreateWithoutUserInputSchema';

export const NotificationSettingCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NotificationSettingCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationSettingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationSettingCreateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default NotificationSettingCreateOrConnectWithoutUserInputSchema;
