import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveWhereInputSchema } from './NotificationArchiveWhereInputSchema';

export const NotificationArchiveListRelationFilterSchema: z.ZodType<Prisma.NotificationArchiveListRelationFilter> = z.object({
  every: z.lazy(() => NotificationArchiveWhereInputSchema).optional(),
  some: z.lazy(() => NotificationArchiveWhereInputSchema).optional(),
  none: z.lazy(() => NotificationArchiveWhereInputSchema).optional()
}).strict();

export default NotificationArchiveListRelationFilterSchema;
