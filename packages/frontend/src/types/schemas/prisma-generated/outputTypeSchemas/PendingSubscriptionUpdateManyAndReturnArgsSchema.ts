import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionUpdateManyMutationInputSchema } from '../inputTypeSchemas/PendingSubscriptionUpdateManyMutationInputSchema'
import { PendingSubscriptionUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PendingSubscriptionUncheckedUpdateManyInputSchema'
import { PendingSubscriptionWhereInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereInputSchema'

export const PendingSubscriptionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PendingSubscriptionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PendingSubscriptionUpdateManyMutationInputSchema,PendingSubscriptionUncheckedUpdateManyInputSchema ]),
  where: PendingSubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default PendingSubscriptionUpdateManyAndReturnArgsSchema;
