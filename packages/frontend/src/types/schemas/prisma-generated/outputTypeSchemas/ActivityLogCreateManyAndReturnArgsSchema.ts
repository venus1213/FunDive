import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogCreateManyInputSchema } from '../inputTypeSchemas/ActivityLogCreateManyInputSchema'

export const ActivityLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ActivityLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ ActivityLogCreateManyInputSchema,ActivityLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ActivityLogCreateManyAndReturnArgsSchema;
