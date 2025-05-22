import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmailLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  sentBy: z.lazy(() => SortOrderSchema).optional(),
  errorDetails: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailLogMinOrderByAggregateInputSchema;
