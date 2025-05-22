import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveSelectSchema } from '../inputTypeSchemas/NotificationArchiveSelectSchema';
import { NotificationArchiveIncludeSchema } from '../inputTypeSchemas/NotificationArchiveIncludeSchema';

export const NotificationArchiveArgsSchema: z.ZodType<Prisma.NotificationArchiveDefaultArgs> = z.object({
  select: z.lazy(() => NotificationArchiveSelectSchema).optional(),
  include: z.lazy(() => NotificationArchiveIncludeSchema).optional(),
}).strict();

export default NotificationArchiveArgsSchema;
