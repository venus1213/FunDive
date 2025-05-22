import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogIncludeSchema } from '../inputTypeSchemas/ActivityLogIncludeSchema'
import { ActivityLogWhereInputSchema } from '../inputTypeSchemas/ActivityLogWhereInputSchema'
import { ActivityLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/ActivityLogOrderByWithRelationInputSchema'
import { ActivityLogWhereUniqueInputSchema } from '../inputTypeSchemas/ActivityLogWhereUniqueInputSchema'
import { ActivityLogScalarFieldEnumSchema } from '../inputTypeSchemas/ActivityLogScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ActivityLogSelectSchema: z.ZodType<Prisma.ActivityLogSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  actionType: z.boolean().optional(),
  targetType: z.boolean().optional(),
  targetId: z.boolean().optional(),
  details: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ActivityLogFindFirstArgsSchema: z.ZodType<Prisma.ActivityLogFindFirstArgs> = z.object({
  select: ActivityLogSelectSchema.optional(),
  include: z.lazy(() => ActivityLogIncludeSchema).optional(),
  where: ActivityLogWhereInputSchema.optional(),
  orderBy: z.union([ ActivityLogOrderByWithRelationInputSchema.array(),ActivityLogOrderByWithRelationInputSchema ]).optional(),
  cursor: ActivityLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActivityLogScalarFieldEnumSchema,ActivityLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ActivityLogFindFirstArgsSchema;
