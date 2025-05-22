import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingUpdateManyMutationInputSchema } from '../inputTypeSchemas/NotificationSettingUpdateManyMutationInputSchema'
import { NotificationSettingUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/NotificationSettingUncheckedUpdateManyInputSchema'
import { NotificationSettingWhereInputSchema } from '../inputTypeSchemas/NotificationSettingWhereInputSchema'

export const NotificationSettingUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationSettingUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationSettingUpdateManyMutationInputSchema,NotificationSettingUncheckedUpdateManyInputSchema ]),
  where: NotificationSettingWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default NotificationSettingUpdateManyAndReturnArgsSchema;
