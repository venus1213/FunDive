import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryCreateManyInputSchema } from '../inputTypeSchemas/SubscriptionHistoryCreateManyInputSchema'

export const SubscriptionHistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriptionHistoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriptionHistoryCreateManyInputSchema,SubscriptionHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SubscriptionHistoryCreateManyAndReturnArgsSchema;
