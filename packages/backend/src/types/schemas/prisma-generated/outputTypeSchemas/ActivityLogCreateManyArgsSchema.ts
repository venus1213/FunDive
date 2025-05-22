import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogCreateManyInputSchema } from '../inputTypeSchemas/ActivityLogCreateManyInputSchema'

export const ActivityLogCreateManyArgsSchema: z.ZodType<Prisma.ActivityLogCreateManyArgs> = z.object({
  data: z.union([ ActivityLogCreateManyInputSchema,ActivityLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ActivityLogCreateManyArgsSchema;
