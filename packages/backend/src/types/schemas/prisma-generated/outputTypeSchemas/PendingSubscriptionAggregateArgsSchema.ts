import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionWhereInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereInputSchema'
import { PendingSubscriptionOrderByWithRelationInputSchema } from '../inputTypeSchemas/PendingSubscriptionOrderByWithRelationInputSchema'
import { PendingSubscriptionWhereUniqueInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereUniqueInputSchema'

export const PendingSubscriptionAggregateArgsSchema: z.ZodType<Prisma.PendingSubscriptionAggregateArgs> = z.object({
  where: PendingSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ PendingSubscriptionOrderByWithRelationInputSchema.array(),PendingSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PendingSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default PendingSubscriptionAggregateArgsSchema;
