import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryCreateManyUserInputSchema } from './SubscriptionHistoryCreateManyUserInputSchema';

export const SubscriptionHistoryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SubscriptionHistoryCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscriptionHistoryCreateManyUserInputSchema),z.lazy(() => SubscriptionHistoryCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default SubscriptionHistoryCreateManyUserInputEnvelopeSchema;
