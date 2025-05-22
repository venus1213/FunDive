import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistoryIncludeSchema } from '../inputTypeSchemas/SubscriptionHistoryIncludeSchema'
import { SubscriptionHistoryWhereInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereInputSchema'
import { SubscriptionHistoryOrderByWithRelationInputSchema } from '../inputTypeSchemas/SubscriptionHistoryOrderByWithRelationInputSchema'
import { SubscriptionHistoryWhereUniqueInputSchema } from '../inputTypeSchemas/SubscriptionHistoryWhereUniqueInputSchema'
import { SubscriptionHistoryScalarFieldEnumSchema } from '../inputTypeSchemas/SubscriptionHistoryScalarFieldEnumSchema'
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

export const SubscriptionHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionHistoryFindFirstOrThrowArgs> = z.object({
  select: SubscriptionHistorySelectSchema.optional(),
  include: z.lazy(() => SubscriptionHistoryIncludeSchema).optional(),
  where: SubscriptionHistoryWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionHistoryOrderByWithRelationInputSchema.array(),SubscriptionHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionHistoryScalarFieldEnumSchema,SubscriptionHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default SubscriptionHistoryFindFirstOrThrowArgsSchema;
