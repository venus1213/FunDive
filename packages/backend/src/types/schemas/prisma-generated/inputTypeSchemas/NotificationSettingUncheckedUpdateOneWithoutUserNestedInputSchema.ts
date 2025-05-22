import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingCreateWithoutUserInputSchema } from './NotificationSettingCreateWithoutUserInputSchema';
import { NotificationSettingUncheckedCreateWithoutUserInputSchema } from './NotificationSettingUncheckedCreateWithoutUserInputSchema';
import { NotificationSettingCreateOrConnectWithoutUserInputSchema } from './NotificationSettingCreateOrConnectWithoutUserInputSchema';
import { NotificationSettingUpsertWithoutUserInputSchema } from './NotificationSettingUpsertWithoutUserInputSchema';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';
import { NotificationSettingWhereUniqueInputSchema } from './NotificationSettingWhereUniqueInputSchema';
import { NotificationSettingUpdateToOneWithWhereWithoutUserInputSchema } from './NotificationSettingUpdateToOneWithWhereWithoutUserInputSchema';
import { NotificationSettingUpdateWithoutUserInputSchema } from './NotificationSettingUpdateWithoutUserInputSchema';
import { NotificationSettingUncheckedUpdateWithoutUserInputSchema } from './NotificationSettingUncheckedUpdateWithoutUserInputSchema';

export const NotificationSettingUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationSettingUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationSettingCreateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NotificationSettingCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => NotificationSettingUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NotificationSettingWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NotificationSettingWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NotificationSettingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NotificationSettingUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => NotificationSettingUpdateWithoutUserInputSchema),z.lazy(() => NotificationSettingUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export default NotificationSettingUncheckedUpdateOneWithoutUserNestedInputSchema;
