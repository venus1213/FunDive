import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { TransactionCountOrderByAggregateInputSchema } from './TransactionCountOrderByAggregateInputSchema';
import { TransactionAvgOrderByAggregateInputSchema } from './TransactionAvgOrderByAggregateInputSchema';
import { TransactionMaxOrderByAggregateInputSchema } from './TransactionMaxOrderByAggregateInputSchema';
import { TransactionMinOrderByAggregateInputSchema } from './TransactionMinOrderByAggregateInputSchema';
import { TransactionSumOrderByAggregateInputSchema } from './TransactionSumOrderByAggregateInputSchema';

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  stripeTransactionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TransactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TransactionSumOrderByAggregateInputSchema).optional()
}).strict();

export default TransactionOrderByWithAggregationInputSchema;
