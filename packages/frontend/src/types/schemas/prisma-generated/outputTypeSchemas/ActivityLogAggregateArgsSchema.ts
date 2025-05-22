import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogWhereInputSchema } from '../inputTypeSchemas/ActivityLogWhereInputSchema'
import { ActivityLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/ActivityLogOrderByWithRelationInputSchema'
import { ActivityLogWhereUniqueInputSchema } from '../inputTypeSchemas/ActivityLogWhereUniqueInputSchema'

export const ActivityLogAggregateArgsSchema: z.ZodType<Prisma.ActivityLogAggregateArgs> = z.object({
  where: ActivityLogWhereInputSchema.optional(),
  orderBy: z.union([ ActivityLogOrderByWithRelationInputSchema.array(),ActivityLogOrderByWithRelationInputSchema ]).optional(),
  cursor: ActivityLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ActivityLogAggregateArgsSchema;
