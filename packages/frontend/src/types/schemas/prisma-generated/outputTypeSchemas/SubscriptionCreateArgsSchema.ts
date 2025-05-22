import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionIncludeSchema } from '../inputTypeSchemas/SubscriptionIncludeSchema'
import { SubscriptionCreateInputSchema } from '../inputTypeSchemas/SubscriptionCreateInputSchema'
import { SubscriptionUncheckedCreateInputSchema } from '../inputTypeSchemas/SubscriptionUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  stripeCustomerId: z.boolean().optional(),
  stripeSubscriptionId: z.boolean().optional(),
  status: z.boolean().optional(),
  currentPeriodStart: z.boolean().optional(),
  currentPeriodEnd: z.boolean().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  nextPlanPriceId: z.boolean().optional(),
  nextPlanStartDate: z.boolean().optional(),
  prorationAmount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SubscriptionCreateArgsSchema: z.ZodType<Prisma.SubscriptionCreateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: z.lazy(() => SubscriptionIncludeSchema).optional(),
  data: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
}).strict() ;

export default SubscriptionCreateArgsSchema;
