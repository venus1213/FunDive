import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ActivityLogSelectSchema } from '../inputTypeSchemas/ActivityLogSelectSchema';
import { ActivityLogIncludeSchema } from '../inputTypeSchemas/ActivityLogIncludeSchema';

export const ActivityLogArgsSchema: z.ZodType<Prisma.ActivityLogDefaultArgs> = z.object({
  select: z.lazy(() => ActivityLogSelectSchema).optional(),
  include: z.lazy(() => ActivityLogIncludeSchema).optional(),
}).strict();

export default ActivityLogArgsSchema;
