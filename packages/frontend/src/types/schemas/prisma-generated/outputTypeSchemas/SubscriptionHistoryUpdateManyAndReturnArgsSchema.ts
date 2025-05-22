import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryUpdateManyMutationInputSchema } from '../inputTypeSchemas/SubscriptionHistoryUpdateManyMutationInputSchema'
import { SubscriptionHistoryUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/SubscriptionHistoryUncheckedUpdateManyInputSchema'
import { SubscriptionHistoryWhereInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereInputSchema'

export const SubscriptionHistoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriptionHistoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriptionHistoryUpdateManyMutationInputSchema,SubscriptionHistoryUncheckedUpdateManyInputSchema ]),
  where: SubscriptionHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default SubscriptionHistoryUpdateManyAndReturnArgsSchema;
