import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailLogCountOrderByAggregateInputSchema } from './EmailLogCountOrderByAggregateInputSchema';
import { EmailLogMaxOrderByAggregateInputSchema } from './EmailLogMaxOrderByAggregateInputSchema';
import { EmailLogMinOrderByAggregateInputSchema } from './EmailLogMinOrderByAggregateInputSchema';

export const EmailLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  recipientIds: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  sentBy: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  errorDetails: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EmailLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailLogMinOrderByAggregateInputSchema).optional()
}).strict();

export default EmailLogOrderByWithAggregationInputSchema;
