import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryWhereInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereInputSchema'
import { SubscriptionHistoryOrderByWithRelationInputSchema } from '../inputTypeSchemas/SubscriptionHistoryOrderByWithRelationInputSchema'
import { SubscriptionHistoryWhereUniqueInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereUniqueInputSchema'

export const SubscriptionHistoryAggregateArgsSchema: z.ZodType<Prisma.SubscriptionHistoryAggregateArgs> = z.object({
  where: SubscriptionHistoryWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionHistoryOrderByWithRelationInputSchema.array(),SubscriptionHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SubscriptionHistoryAggregateArgsSchema;
