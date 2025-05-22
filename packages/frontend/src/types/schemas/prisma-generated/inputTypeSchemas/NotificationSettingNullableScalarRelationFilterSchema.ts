import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';

export const NotificationSettingNullableScalarRelationFilterSchema: z.ZodType<Prisma.NotificationSettingNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => NotificationSettingWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NotificationSettingWhereInputSchema).optional().nullable()
}).strict();

export default NotificationSettingNullableScalarRelationFilterSchema;
