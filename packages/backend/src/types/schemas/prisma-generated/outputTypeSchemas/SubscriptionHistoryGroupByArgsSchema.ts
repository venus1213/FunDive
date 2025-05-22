import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryWhereInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereInputSchema'
import { SubscriptionHistoryOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SubscriptionHistoryOrderByWithAggregationInputSchema'
import { SubscriptionHistoryScalarFieldEnumSchema } from '../inputTypeSchemas/SubscriptionHistoryScalarFieldEnumSchema'
import { SubscriptionHistoryScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SubscriptionHistoryScalarWhereWithAggregatesInputSchema'

export const SubscriptionHistoryGroupByArgsSchema: z.ZodType<Prisma.SubscriptionHistoryGroupByArgs> = z.object({
  where: SubscriptionHistoryWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionHistoryOrderByWithAggregationInputSchema.array(),SubscriptionHistoryOrderByWithAggregationInputSchema ]).optional(),
  by: SubscriptionHistoryScalarFieldEnumSchema.array(),
  having: SubscriptionHistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SubscriptionHistoryGroupByArgsSchema;
