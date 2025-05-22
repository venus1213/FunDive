import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProcessedStripeEventCreateManyInputSchema: z.ZodType<Prisma.ProcessedStripeEventCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  eventId: z.string(),
  type: z.string(),
  processedAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export default ProcessedStripeEventCreateManyInputSchema;
