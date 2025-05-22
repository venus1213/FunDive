import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionCreateManyInputSchema } from '../inputTypeSchemas/PendingSubscriptionCreateManyInputSchema'

export const PendingSubscriptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PendingSubscriptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PendingSubscriptionCreateManyInputSchema,PendingSubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default PendingSubscriptionCreateManyAndReturnArgsSchema;
