import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryWhereInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereInputSchema'

export const SubscriptionHistoryDeleteManyArgsSchema: z.ZodType<Prisma.SubscriptionHistoryDeleteManyArgs> = z.object({
  where: SubscriptionHistoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default SubscriptionHistoryDeleteManyArgsSchema;
