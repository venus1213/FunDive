import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingCreateManyInputSchema } from '../inputTypeSchemas/NotificationSettingCreateManyInputSchema'

export const NotificationSettingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationSettingCreateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationSettingCreateManyInputSchema,NotificationSettingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default NotificationSettingCreateManyAndReturnArgsSchema;
