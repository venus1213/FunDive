import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogWhereInputSchema } from './ActivityLogWhereInputSchema';

export const ActivityLogListRelationFilterSchema: z.ZodType<Prisma.ActivityLogListRelationFilter> = z.object({
  every: z.lazy(() => ActivityLogWhereInputSchema).optional(),
  some: z.lazy(() => ActivityLogWhereInputSchema).optional(),
  none: z.lazy(() => ActivityLogWhereInputSchema).optional()
}).strict();

export default ActivityLogListRelationFilterSchema;
