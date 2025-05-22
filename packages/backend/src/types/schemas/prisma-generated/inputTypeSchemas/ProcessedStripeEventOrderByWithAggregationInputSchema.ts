import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ProcessedStripeEventCountOrderByAggregateInputSchema } from './ProcessedStripeEventCountOrderByAggregateInputSchema';
import { ProcessedStripeEventMaxOrderByAggregateInputSchema } from './ProcessedStripeEventMaxOrderByAggregateInputSchema';
import { ProcessedStripeEventMinOrderByAggregateInputSchema } from './ProcessedStripeEventMinOrderByAggregateInputSchema';

export const ProcessedStripeEventOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProcessedStripeEventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  processedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProcessedStripeEventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProcessedStripeEventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProcessedStripeEventMinOrderByAggregateInputSchema).optional()
}).strict();

export default ProcessedStripeEventOrderByWithAggregationInputSchema;
