import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionCreateManyInputSchema } from '../inputTypeSchemas/PendingSubscriptionCreateManyInputSchema'

export const PendingSubscriptionCreateManyArgsSchema: z.ZodType<Prisma.PendingSubscriptionCreateManyArgs> = z.object({
  data: z.union([ PendingSubscriptionCreateManyInputSchema,PendingSubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default PendingSubscriptionCreateManyArgsSchema;
