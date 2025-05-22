import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveCreateManyInputSchema } from '../inputTypeSchemas/NotificationArchiveCreateManyInputSchema'

export const NotificationArchiveCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationArchiveCreateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationArchiveCreateManyInputSchema,NotificationArchiveCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default NotificationArchiveCreateManyAndReturnArgsSchema;
