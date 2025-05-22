import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionAvgOrderByAggregateInput> = z.object({
  prorationAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionAvgOrderByAggregateInputSchema;
