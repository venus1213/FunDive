import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveCreateManyInputSchema } from '../inputTypeSchemas/NotificationArchiveCreateManyInputSchema'

export const NotificationArchiveCreateManyArgsSchema: z.ZodType<Prisma.NotificationArchiveCreateManyArgs> = z.object({
  data: z.union([ NotificationArchiveCreateManyInputSchema,NotificationArchiveCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default NotificationArchiveCreateManyArgsSchema;
