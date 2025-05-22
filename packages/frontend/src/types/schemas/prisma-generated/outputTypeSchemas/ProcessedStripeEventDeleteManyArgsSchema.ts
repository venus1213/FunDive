import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventWhereInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereInputSchema'

export const ProcessedStripeEventDeleteManyArgsSchema: z.ZodType<Prisma.ProcessedStripeEventDeleteManyArgs> = z.object({
  where: ProcessedStripeEventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ProcessedStripeEventDeleteManyArgsSchema;
