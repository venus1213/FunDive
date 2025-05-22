import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionHistoryWhereInputSchema } from './SubscriptionHistoryWhereInputSchema';

export const SubscriptionHistoryListRelationFilterSchema: z.ZodType<Prisma.SubscriptionHistoryListRelationFilter> = z.object({
  every: z.lazy(() => SubscriptionHistoryWhereInputSchema).optional(),
  some: z.lazy(() => SubscriptionHistoryWhereInputSchema).optional(),
  none: z.lazy(() => SubscriptionHistoryWhereInputSchema).optional()
}).strict();

export default SubscriptionHistoryListRelationFilterSchema;
