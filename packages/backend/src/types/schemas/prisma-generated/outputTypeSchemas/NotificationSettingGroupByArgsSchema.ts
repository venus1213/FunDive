import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingWhereInputSchema } from '../inputTypeSchemas/NotificationSettingWhereInputSchema'
import { NotificationSettingOrderByWithAggregationInputSchema } from '../inputTypeSchemas/NotificationSettingOrderByWithAggregationInputSchema'
import { NotificationSettingScalarFieldEnumSchema } from '../inputTypeSchemas/NotificationSettingScalarFieldEnumSchema'
import { NotificationSettingScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/NotificationSettingScalarWhereWithAggregatesInputSchema'

export const NotificationSettingGroupByArgsSchema: z.ZodType<Prisma.NotificationSettingGroupByArgs> = z.object({
  where: NotificationSettingWhereInputSchema.optional(),
  orderBy: z.union([ NotificationSettingOrderByWithAggregationInputSchema.array(),NotificationSettingOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationSettingScalarFieldEnumSchema.array(),
  having: NotificationSettingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default NotificationSettingGroupByArgsSchema;
