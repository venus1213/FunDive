import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogIncludeSchema } from '../inputTypeSchemas/ActivityLogIncludeSchema'
import { ActivityLogWhereUniqueInputSchema } from '../inputTypeSchemas/ActivityLogWhereUniqueInputSchema'
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

export const ActivityLogDeleteArgsSchema: z.ZodType<Prisma.ActivityLogDeleteArgs> = z.object({
  select: ActivityLogSelectSchema.optional(),
  include: z.lazy(() => ActivityLogIncludeSchema).optional(),
  where: ActivityLogWhereUniqueInputSchema,
}).strict() ;

export default ActivityLogDeleteArgsSchema;
