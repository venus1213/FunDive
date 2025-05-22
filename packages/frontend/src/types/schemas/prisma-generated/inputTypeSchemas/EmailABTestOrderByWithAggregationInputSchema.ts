import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailABTestCountOrderByAggregateInputSchema } from './EmailABTestCountOrderByAggregateInputSchema';
import { EmailABTestMaxOrderByAggregateInputSchema } from './EmailABTestMaxOrderByAggregateInputSchema';
import { EmailABTestMinOrderByAggregateInputSchema } from './EmailABTestMinOrderByAggregateInputSchema';

export const EmailABTestOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailABTestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  variantA: z.lazy(() => SortOrderSchema).optional(),
  variantB: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  winningVariant: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  metrics: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailABTestCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailABTestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailABTestMinOrderByAggregateInputSchema).optional()
}).strict();

export default EmailABTestOrderByWithAggregationInputSchema;
