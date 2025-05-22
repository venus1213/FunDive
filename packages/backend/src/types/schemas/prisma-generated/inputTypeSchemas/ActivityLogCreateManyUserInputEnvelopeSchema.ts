import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogCreateManyUserInputSchema } from './ActivityLogCreateManyUserInputSchema';

export const ActivityLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ActivityLogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ActivityLogCreateManyUserInputSchema),z.lazy(() => ActivityLogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ActivityLogCreateManyUserInputEnvelopeSchema;
