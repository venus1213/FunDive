import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveUpdateManyMutationInputSchema } from '../inputTypeSchemas/NotificationArchiveUpdateManyMutationInputSchema'
import { NotificationArchiveUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/NotificationArchiveUncheckedUpdateManyInputSchema'
import { NotificationArchiveWhereInputSchema } from '../inputTypeSchemas/NotificationArchiveWhereInputSchema'

export const NotificationArchiveUpdateManyArgsSchema: z.ZodType<Prisma.NotificationArchiveUpdateManyArgs> = z.object({
  data: z.union([ NotificationArchiveUpdateManyMutationInputSchema,NotificationArchiveUncheckedUpdateManyInputSchema ]),
  where: NotificationArchiveWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default NotificationArchiveUpdateManyArgsSchema;
