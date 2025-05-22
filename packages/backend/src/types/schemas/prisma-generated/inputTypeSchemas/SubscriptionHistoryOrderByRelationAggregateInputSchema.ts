import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionHistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubscriptionHistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionHistoryOrderByRelationAggregateInputSchema;
