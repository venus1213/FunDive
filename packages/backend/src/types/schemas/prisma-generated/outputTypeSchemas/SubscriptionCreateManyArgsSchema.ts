import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionCreateManyInputSchema } from '../inputTypeSchemas/SubscriptionCreateManyInputSchema'

export const SubscriptionCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyArgs> = z.object({
  data: z.union([ SubscriptionCreateManyInputSchema,SubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SubscriptionCreateManyArgsSchema;
