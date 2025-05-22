import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionHistorySumOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionHistorySumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionHistorySumOrderByAggregateInputSchema;
