import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionIncludeSchema } from '../inputTypeSchemas/PendingSubscriptionIncludeSchema'
import { PendingSubscriptionUpdateInputSchema } from '../inputTypeSchemas/PendingSubscriptionUpdateInputSchema'
import { PendingSubscriptionUncheckedUpdateInputSchema } from '../inputTypeSchemas/PendingSubscriptionUncheckedUpdateInputSchema'
import { PendingSubscriptionWhereUniqueInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PendingSubscriptionSelectSchema: z.ZodType<Prisma.PendingSubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  planType: z.boolean().optional(),
  billingCycle: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PendingSubscriptionUpdateArgsSchema: z.ZodType<Prisma.PendingSubscriptionUpdateArgs> = z.object({
  select: PendingSubscriptionSelectSchema.optional(),
  include: z.lazy(() => PendingSubscriptionIncludeSchema).optional(),
  data: z.union([ PendingSubscriptionUpdateInputSchema,PendingSubscriptionUncheckedUpdateInputSchema ]),
  where: PendingSubscriptionWhereUniqueInputSchema,
}).strict() ;

export default PendingSubscriptionUpdateArgsSchema;
