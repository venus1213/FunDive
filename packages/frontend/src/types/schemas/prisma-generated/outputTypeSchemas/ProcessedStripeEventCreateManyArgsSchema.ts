import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventCreateManyInputSchema } from '../inputTypeSchemas/ProcessedStripeEventCreateManyInputSchema'

export const ProcessedStripeEventCreateManyArgsSchema: z.ZodType<Prisma.ProcessedStripeEventCreateManyArgs> = z.object({
  data: z.union([ ProcessedStripeEventCreateManyInputSchema,ProcessedStripeEventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ProcessedStripeEventCreateManyArgsSchema;
