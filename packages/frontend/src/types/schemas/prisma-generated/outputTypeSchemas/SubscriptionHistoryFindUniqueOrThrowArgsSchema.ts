import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryIncludeSchema } from '../inputTypeSchemas/SubscriptionHistoryIncludeSchema'
import { SubscriptionHistoryWhereUniqueInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SubscriptionHistorySelectSchema: z.ZodType<Prisma.SubscriptionHistorySelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  planName: z.boolean().optional(),
  amount: z.boolean().optional(),
  status: z.boolean().optional(),
  stripeSubscriptionId: z.boolean().optional(),
  previousPlanType: z.boolean().optional(),
  newPlanType: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SubscriptionHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionHistoryFindUniqueOrThrowArgs> = z.object({
  select: SubscriptionHistorySelectSchema.optional(),
  include: z.lazy(() => SubscriptionHistoryIncludeSchema).optional(),
  where: SubscriptionHistoryWhereUniqueInputSchema,
}).strict() ;

export default SubscriptionHistoryFindUniqueOrThrowArgsSchema;
