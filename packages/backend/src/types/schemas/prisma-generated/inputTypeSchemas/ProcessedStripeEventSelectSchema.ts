import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ProcessedStripeEventSelectSchema: z.ZodType<Prisma.ProcessedStripeEventSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  type: z.boolean().optional(),
  processedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export default ProcessedStripeEventSelectSchema;
