import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveWhereInputSchema } from '../inputTypeSchemas/NotificationArchiveWhereInputSchema'

export const NotificationArchiveDeleteManyArgsSchema: z.ZodType<Prisma.NotificationArchiveDeleteManyArgs> = z.object({
  where: NotificationArchiveWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default NotificationArchiveDeleteManyArgsSchema;
