import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SubscriptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionSumOrderByAggregateInput> = z.object({
  prorationAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SubscriptionSumOrderByAggregateInputSchema;
