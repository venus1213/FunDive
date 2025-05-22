import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { EmailABTestResultCountOrderByAggregateInputSchema } from './EmailABTestResultCountOrderByAggregateInputSchema';
import { EmailABTestResultMaxOrderByAggregateInputSchema } from './EmailABTestResultMaxOrderByAggregateInputSchema';
import { EmailABTestResultMinOrderByAggregateInputSchema } from './EmailABTestResultMinOrderByAggregateInputSchema';

export const EmailABTestResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailABTestResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  testId: z.lazy(() => SortOrderSchema).optional(),
  variant: z.lazy(() => SortOrderSchema).optional(),
  emailId: z.lazy(() => SortOrderSchema).optional(),
  opened: z.lazy(() => SortOrderSchema).optional(),
  clicked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailABTestResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailABTestResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailABTestResultMinOrderByAggregateInputSchema).optional()
}).strict();

export default EmailABTestResultOrderByWithAggregationInputSchema;
