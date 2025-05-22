import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';

export const NotificationSettingNullableRelationFilterSchema: z.ZodType<Prisma.NotificationSettingNullableRelationFilter> = z.object({
  is: z.lazy(() => NotificationSettingWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NotificationSettingWhereInputSchema).optional().nullable()
}).strict();

export default NotificationSettingNullableRelationFilterSchema;
