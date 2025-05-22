import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveWhereInputSchema } from '../inputTypeSchemas/NotificationArchiveWhereInputSchema'
import { NotificationArchiveOrderByWithRelationInputSchema } from '../inputTypeSchemas/NotificationArchiveOrderByWithRelationInputSchema'
import { NotificationArchiveWhereUniqueInputSchema } from '../inputTypeSchemas/NotificationArchiveWhereUniqueInputSchema'

export const NotificationArchiveAggregateArgsSchema: z.ZodType<Prisma.NotificationArchiveAggregateArgs> = z.object({
  where: NotificationArchiveWhereInputSchema.optional(),
  orderBy: z.union([ NotificationArchiveOrderByWithRelationInputSchema.array(),NotificationArchiveOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationArchiveWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default NotificationArchiveAggregateArgsSchema;
