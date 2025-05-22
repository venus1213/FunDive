import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionHistoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionHistoryAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionHistoryAvgOrderByAggregateInputSchema;
