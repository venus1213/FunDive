import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionIncludeSchema } from '../inputTypeSchemas/PendingSubscriptionIncludeSchema'
import { PendingSubscriptionWhereInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereInputSchema'
import { PendingSubscriptionOrderByWithRelationInputSchema } from '../inputTypeSchemas/PendingSubscriptionOrderByWithRelationInputSchema'
import { PendingSubscriptionWhereUniqueInputSchema } from '../inputTypeSchemas/PendingSubscriptionWhereUniqueInputSchema'
import { PendingSubscriptionScalarFieldEnumSchema } from '../inputTypeSchemas/PendingSubscriptionScalarFieldEnumSchema'
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

export const PendingSubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PendingSubscriptionFindFirstOrThrowArgs> = z.object({
  select: PendingSubscriptionSelectSchema.optional(),
  include: z.lazy(() => PendingSubscriptionIncludeSchema).optional(),
  where: PendingSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ PendingSubscriptionOrderByWithRelationInputSchema.array(),PendingSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PendingSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PendingSubscriptionScalarFieldEnumSchema,PendingSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default PendingSubscriptionFindFirstOrThrowArgsSchema;
