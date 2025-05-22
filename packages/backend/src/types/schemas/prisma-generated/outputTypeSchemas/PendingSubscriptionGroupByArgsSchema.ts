import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionWhereInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereInputSchema'
import { PendingSubscriptionOrderByWithAggregationInputSchema } from '../inputTypeSchemas/PendingSubscriptionOrderByWithAggregationInputSchema'
import { PendingSubscriptionScalarFieldEnumSchema } from '../inputTypeSchemas/PendingSubscriptionScalarFieldEnumSchema'
import { PendingSubscriptionScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/PendingSubscriptionScalarWhereWithAggregatesInputSchema'

export const PendingSubscriptionGroupByArgsSchema: z.ZodType<Prisma.PendingSubscriptionGroupByArgs> = z.object({
  where: PendingSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ PendingSubscriptionOrderByWithAggregationInputSchema.array(),PendingSubscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: PendingSubscriptionScalarFieldEnumSchema.array(),
  having: PendingSubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default PendingSubscriptionGroupByArgsSchema;
