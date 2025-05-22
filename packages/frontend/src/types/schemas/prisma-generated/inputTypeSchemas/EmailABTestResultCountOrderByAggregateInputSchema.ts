import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailABTestResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmailABTestResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  testId: z.lazy(() => SortOrderSchema).optional(),
  variant: z.lazy(() => SortOrderSchema).optional(),
  emailId: z.lazy(() => SortOrderSchema).optional(),
  opened: z.lazy(() => SortOrderSchema).optional(),
  clicked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailABTestResultCountOrderByAggregateInputSchema;
