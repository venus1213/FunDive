import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventUpdateManyMutationInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUpdateManyMutationInputSchema'
import { ProcessedStripeEventUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUncheckedUpdateManyInputSchema'
import { ProcessedStripeEventWhereInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereInputSchema'

export const ProcessedStripeEventUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProcessedStripeEventUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProcessedStripeEventUpdateManyMutationInputSchema,ProcessedStripeEventUncheckedUpdateManyInputSchema ]),
  where: ProcessedStripeEventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ProcessedStripeEventUpdateManyAndReturnArgsSchema;
