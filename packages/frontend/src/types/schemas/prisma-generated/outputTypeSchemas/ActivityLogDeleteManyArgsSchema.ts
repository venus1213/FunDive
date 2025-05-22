import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogWhereInputSchema } from '../inputTypeSchemas/ActivityLogWhereInputSchema'

export const ActivityLogDeleteManyArgsSchema: z.ZodType<Prisma.ActivityLogDeleteManyArgs> = z.object({
  where: ActivityLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ActivityLogDeleteManyArgsSchema;
