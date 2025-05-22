import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveWhereInputSchema } from '../inputTypeSchemas/NotificationArchiveWhereInputSchema'
import { NotificationArchiveOrderByWithAggregationInputSchema } from '../inputTypeSchemas/NotificationArchiveOrderByWithAggregationInputSchema'
import { NotificationArchiveScalarFieldEnumSchema } from '../inputTypeSchemas/NotificationArchiveScalarFieldEnumSchema'
import { NotificationArchiveScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/NotificationArchiveScalarWhereWithAggregatesInputSchema'

export const NotificationArchiveGroupByArgsSchema: z.ZodType<Prisma.NotificationArchiveGroupByArgs> = z.object({
  where: NotificationArchiveWhereInputSchema.optional(),
  orderBy: z.union([ NotificationArchiveOrderByWithAggregationInputSchema.array(),NotificationArchiveOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationArchiveScalarFieldEnumSchema.array(),
  having: NotificationArchiveScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default NotificationArchiveGroupByArgsSchema;
