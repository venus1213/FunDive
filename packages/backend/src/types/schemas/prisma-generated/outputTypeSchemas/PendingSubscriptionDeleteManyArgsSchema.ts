import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionWhereInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereInputSchema'

export const PendingSubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.PendingSubscriptionDeleteManyArgs> = z.object({
  where: PendingSubscriptionWhereInputSchema.optional(),
}).strict() ;

export default PendingSubscriptionDeleteManyArgsSchema;
