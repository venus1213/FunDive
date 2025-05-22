import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogWhereInputSchema } from '../inputTypeSchemas/ActivityLogWhereInputSchema'
import { ActivityLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ActivityLogOrderByWithAggregationInputSchema'
import { ActivityLogScalarFieldEnumSchema } from '../inputTypeSchemas/ActivityLogScalarFieldEnumSchema'
import { ActivityLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ActivityLogScalarWhereWithAggregatesInputSchema'

export const ActivityLogGroupByArgsSchema: z.ZodType<Prisma.ActivityLogGroupByArgs> = z.object({
  where: ActivityLogWhereInputSchema.optional(),
  orderBy: z.union([ ActivityLogOrderByWithAggregationInputSchema.array(),ActivityLogOrderByWithAggregationInputSchema ]).optional(),
  by: ActivityLogScalarFieldEnumSchema.array(),
  having: ActivityLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ActivityLogGroupByArgsSchema;
