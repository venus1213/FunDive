import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryUpdateManyMutationInputSchema } from '../inputTypeSchemas/SubscriptionHistoryUpdateManyMutationInputSchema'
import { SubscriptionHistoryUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/SubscriptionHistoryUncheckedUpdateManyInputSchema'
import { SubscriptionHistoryWhereInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereInputSchema'

export const SubscriptionHistoryUpdateManyArgsSchema: z.ZodType<Prisma.SubscriptionHistoryUpdateManyArgs> = z.object({
  data: z.union([ SubscriptionHistoryUpdateManyMutationInputSchema,SubscriptionHistoryUncheckedUpdateManyInputSchema ]),
  where: SubscriptionHistoryWhereInputSchema.optional(),
}).strict() ;

export default SubscriptionHistoryUpdateManyArgsSchema;
