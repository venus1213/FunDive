import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ErrorLogCountOrderByAggregateInputSchema } from './ErrorLogCountOrderByAggregateInputSchema';
import { ErrorLogMaxOrderByAggregateInputSchema } from './ErrorLogMaxOrderByAggregateInputSchema';
import { ErrorLogMinOrderByAggregateInputSchema } from './ErrorLogMinOrderByAggregateInputSchema';

export const ErrorLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.ErrorLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  error: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ErrorLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ErrorLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ErrorLogMinOrderByAggregateInputSchema).optional()
}).strict();

export default ErrorLogOrderByWithAggregationInputSchema;
