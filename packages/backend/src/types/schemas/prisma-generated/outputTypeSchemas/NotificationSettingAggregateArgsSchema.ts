import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingWhereInputSchema } from '../inputTypeSchemas/NotificationSettingWhereInputSchema'
import { NotificationSettingOrderByWithRelationInputSchema } from '../inputTypeSchemas/NotificationSettingOrderByWithRelationInputSchema'
import { NotificationSettingWhereUniqueInputSchema } from '../inputTypeSchemas/NotificationSettingWhereUniqueInputSchema'

export const NotificationSettingAggregateArgsSchema: z.ZodType<Prisma.NotificationSettingAggregateArgs> = z.object({
  where: NotificationSettingWhereInputSchema.optional(),
  orderBy: z.union([ NotificationSettingOrderByWithRelationInputSchema.array(),NotificationSettingOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationSettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default NotificationSettingAggregateArgsSchema;
