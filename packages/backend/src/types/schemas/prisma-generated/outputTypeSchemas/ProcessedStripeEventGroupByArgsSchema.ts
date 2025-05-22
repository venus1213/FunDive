import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventWhereInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereInputSchema'
import { ProcessedStripeEventOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ProcessedStripeEventOrderByWithAggregationInputSchema'
import { ProcessedStripeEventScalarFieldEnumSchema } from '../inputTypeSchemas/ProcessedStripeEventScalarFieldEnumSchema'
import { ProcessedStripeEventScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ProcessedStripeEventScalarWhereWithAggregatesInputSchema'

export const ProcessedStripeEventGroupByArgsSchema: z.ZodType<Prisma.ProcessedStripeEventGroupByArgs> = z.object({
  where: ProcessedStripeEventWhereInputSchema.optional(),
  orderBy: z.union([ ProcessedStripeEventOrderByWithAggregationInputSchema.array(),ProcessedStripeEventOrderByWithAggregationInputSchema ]).optional(),
  by: ProcessedStripeEventScalarFieldEnumSchema.array(),
  having: ProcessedStripeEventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ProcessedStripeEventGroupByArgsSchema;
