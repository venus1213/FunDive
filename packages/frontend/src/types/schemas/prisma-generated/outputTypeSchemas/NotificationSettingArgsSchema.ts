import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingSelectSchema } from '../inputTypeSchemas/NotificationSettingSelectSchema';
import { NotificationSettingIncludeSchema } from '../inputTypeSchemas/NotificationSettingIncludeSchema';

export const NotificationSettingArgsSchema: z.ZodType<Prisma.NotificationSettingDefaultArgs> = z.object({
  select: z.lazy(() => NotificationSettingSelectSchema).optional(),
  include: z.lazy(() => NotificationSettingIncludeSchema).optional(),
}).strict();

export default NotificationSettingArgsSchema;
