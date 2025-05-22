import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionUpdateManyMutationInputSchema } from '../inputTypeSchemas/PendingSubscriptionUpdateManyMutationInputSchema'
import { PendingSubscriptionUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PendingSubscriptionUncheckedUpdateManyInputSchema'
import { PendingSubscriptionWhereInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereInputSchema'

export const PendingSubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.PendingSubscriptionUpdateManyArgs> = z.object({
  data: z.union([ PendingSubscriptionUpdateManyMutationInputSchema,PendingSubscriptionUncheckedUpdateManyInputSchema ]),
  where: PendingSubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default PendingSubscriptionUpdateManyArgsSchema;
