import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingCreateWithoutUserInputSchema } from './NotificationSettingCreateWithoutUserInputSchema';
import { NotificationSettingUncheckedCreateWithoutUserInputSchema } from './NotificationSettingUncheckedCreateWithoutUserInputSchema';
import { NotificationSettingCreateOrConnectWithoutUserInputSchema } from './NotificationSettingCreateOrConnectWithoutUserInputSchema';
import { NotificationSettingWhereUniqueInputSchema } from './NotificationSettingWhereUniqueInputSchema';

export const NotificationSettingCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.NotificationSettingCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NotificationSettingCreateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NotificationSettingCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => NotificationSettingWhereUniqueInputSchema).optional()
}).strict();

export default NotificationSettingCreateNestedOneWithoutUserInputSchema;
