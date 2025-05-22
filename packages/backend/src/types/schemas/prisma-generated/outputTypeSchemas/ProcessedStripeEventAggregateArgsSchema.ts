import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventWhereInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereInputSchema'
import { ProcessedStripeEventOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProcessedStripeEventOrderByWithRelationInputSchema'
import { ProcessedStripeEventWhereUniqueInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereUniqueInputSchema'

export const ProcessedStripeEventAggregateArgsSchema: z.ZodType<Prisma.ProcessedStripeEventAggregateArgs> = z.object({
  where: ProcessedStripeEventWhereInputSchema.optional(),
  orderBy: z.union([ ProcessedStripeEventOrderByWithRelationInputSchema.array(),ProcessedStripeEventOrderByWithRelationInputSchema ]).optional(),
  cursor: ProcessedStripeEventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ProcessedStripeEventAggregateArgsSchema;
