import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventWhereInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereInputSchema'
import { ProcessedStripeEventOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProcessedStripeEventOrderByWithRelationInputSchema'
import { ProcessedStripeEventWhereUniqueInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereUniqueInputSchema'
import { ProcessedStripeEventScalarFieldEnumSchema } from '../inputTypeSchemas/ProcessedStripeEventScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProcessedStripeEventSelectSchema: z.ZodType<Prisma.ProcessedStripeEventSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  type: z.boolean().optional(),
  processedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const ProcessedStripeEventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProcessedStripeEventFindFirstOrThrowArgs> = z.object({
  select: ProcessedStripeEventSelectSchema.optional(),
  where: ProcessedStripeEventWhereInputSchema.optional(),
  orderBy: z.union([ ProcessedStripeEventOrderByWithRelationInputSchema.array(),ProcessedStripeEventOrderByWithRelationInputSchema ]).optional(),
  cursor: ProcessedStripeEventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProcessedStripeEventScalarFieldEnumSchema,ProcessedStripeEventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ProcessedStripeEventFindFirstOrThrowArgsSchema;
