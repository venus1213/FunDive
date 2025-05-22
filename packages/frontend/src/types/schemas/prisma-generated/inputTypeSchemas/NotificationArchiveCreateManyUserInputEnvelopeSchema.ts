import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NotificationArchiveCreateManyUserInputSchema } from './NotificationArchiveCreateManyUserInputSchema';

export const NotificationArchiveCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NotificationArchiveCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationArchiveCreateManyUserInputSchema),z.lazy(() => NotificationArchiveCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default NotificationArchiveCreateManyUserInputEnvelopeSchema;
