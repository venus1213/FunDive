import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventCreateInputSchema } from '../inputTypeSchemas/ProcessedStripeEventCreateInputSchema'
import { ProcessedStripeEventUncheckedCreateInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProcessedStripeEventSelectSchema: z.ZodType<Prisma.ProcessedStripeEventSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  type: z.boolean().optional(),
  processedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const ProcessedStripeEventCreateArgsSchema: z.ZodType<Prisma.ProcessedStripeEventCreateArgs> = z.object({
  select: ProcessedStripeEventSelectSchema.optional(),
  data: z.union([ ProcessedStripeEventCreateInputSchema,ProcessedStripeEventUncheckedCreateInputSchema ]),
}).strict() ;

export default ProcessedStripeEventCreateArgsSchema;
