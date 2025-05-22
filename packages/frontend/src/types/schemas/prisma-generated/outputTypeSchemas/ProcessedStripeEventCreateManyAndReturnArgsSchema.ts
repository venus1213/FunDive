import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventCreateManyInputSchema } from '../inputTypeSchemas/ProcessedStripeEventCreateManyInputSchema'

export const ProcessedStripeEventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProcessedStripeEventCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProcessedStripeEventCreateManyInputSchema,ProcessedStripeEventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ProcessedStripeEventCreateManyAndReturnArgsSchema;
