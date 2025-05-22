import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventWhereUniqueInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProcessedStripeEventSelectSchema: z.ZodType<Prisma.ProcessedStripeEventSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  type: z.boolean().optional(),
  processedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const ProcessedStripeEventFindUniqueArgsSchema: z.ZodType<Prisma.ProcessedStripeEventFindUniqueArgs> = z.object({
  select: ProcessedStripeEventSelectSchema.optional(),
  where: ProcessedStripeEventWhereUniqueInputSchema,
}).strict() ;

export default ProcessedStripeEventFindUniqueArgsSchema;
