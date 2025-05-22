import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventWhereUniqueInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereUniqueInputSchema'
import { ProcessedStripeEventCreateInputSchema } from '../inputTypeSchemas/ProcessedStripeEventCreateInputSchema'
import { ProcessedStripeEventUncheckedCreateInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUncheckedCreateInputSchema'
import { ProcessedStripeEventUpdateInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUpdateInputSchema'
import { ProcessedStripeEventUncheckedUpdateInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProcessedStripeEventSelectSchema: z.ZodType<Prisma.ProcessedStripeEventSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  type: z.boolean().optional(),
  processedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const ProcessedStripeEventUpsertArgsSchema: z.ZodType<Prisma.ProcessedStripeEventUpsertArgs> = z.object({
  select: ProcessedStripeEventSelectSchema.optional(),
  where: ProcessedStripeEventWhereUniqueInputSchema,
  create: z.union([ ProcessedStripeEventCreateInputSchema,ProcessedStripeEventUncheckedCreateInputSchema ]),
  update: z.union([ ProcessedStripeEventUpdateInputSchema,ProcessedStripeEventUncheckedUpdateInputSchema ]),
}).strict() ;

export default ProcessedStripeEventUpsertArgsSchema;
