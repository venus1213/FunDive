import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryCreateManyInputSchema } from '../inputTypeSchemas/SubscriptionHistoryCreateManyInputSchema'

export const SubscriptionHistoryCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionHistoryCreateManyArgs> = z.object({
  data: z.union([ SubscriptionHistoryCreateManyInputSchema,SubscriptionHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SubscriptionHistoryCreateManyArgsSchema;
