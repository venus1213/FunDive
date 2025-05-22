import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingWhereInputSchema } from '../inputTypeSchemas/NotificationSettingWhereInputSchema'

export const NotificationSettingDeleteManyArgsSchema: z.ZodType<Prisma.NotificationSettingDeleteManyArgs> = z.object({
  where: NotificationSettingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default NotificationSettingDeleteManyArgsSchema;
