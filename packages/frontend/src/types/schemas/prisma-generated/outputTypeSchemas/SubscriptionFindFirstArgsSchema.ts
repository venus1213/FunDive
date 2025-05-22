import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionIncludeSchema } from '../inputTypeSchemas/SubscriptionIncludeSchema'
import { SubscriptionWhereInputSchema } from '../inputTypeSchemas/SubscriptionWhereInputSchema'
import { SubscriptionOrderByWithRelationInputSchema } from '../inputTypeSchemas/SubscriptionOrderByWithRelationInputSchema'
import { SubscriptionWhereUniqueInputSchema } from '../inputTypeSchemas/SubscriptionWhereUniqueInputSchema'
import { SubscriptionScalarFieldEnumSchema } from '../inputTypeSchemas/SubscriptionScalarFieldEnumSchema'
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

export const SubscriptionFindFirstArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: z.lazy(() => SubscriptionIncludeSchema).optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default SubscriptionFindFirstArgsSchema;
