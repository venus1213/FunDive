import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/ActivityLogUpdateManyMutationInputSchema'
import { ActivityLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ActivityLogUncheckedUpdateManyInputSchema'
import { ActivityLogWhereInputSchema } from '../inputTypeSchemas/ActivityLogWhereInputSchema'

export const ActivityLogUpdateManyArgsSchema: z.ZodType<Prisma.ActivityLogUpdateManyArgs> = z.object({
  data: z.union([ ActivityLogUpdateManyMutationInputSchema,ActivityLogUncheckedUpdateManyInputSchema ]),
  where: ActivityLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ActivityLogUpdateManyArgsSchema;
