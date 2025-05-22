import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProcessedStripeEventUpdateManyMutationInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUpdateManyMutationInputSchema'
import { ProcessedStripeEventUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ProcessedStripeEventUncheckedUpdateManyInputSchema'
import { ProcessedStripeEventWhereInputSchema } from '../inputTypeSchemas/ProcessedStripeEventWhereInputSchema'

export const ProcessedStripeEventUpdateManyArgsSchema: z.ZodType<Prisma.ProcessedStripeEventUpdateManyArgs> = z.object({
  data: z.union([ ProcessedStripeEventUpdateManyMutationInputSchema,ProcessedStripeEventUncheckedUpdateManyInputSchema ]),
  where: ProcessedStripeEventWhereInputSchema.optional(),
}).strict() ;

export default ProcessedStripeEventUpdateManyArgsSchema;
