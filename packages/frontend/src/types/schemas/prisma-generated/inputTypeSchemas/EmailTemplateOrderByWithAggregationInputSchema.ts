import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailTemplateCountOrderByAggregateInputSchema } from './EmailTemplateCountOrderByAggregateInputSchema';
import { EmailTemplateMaxOrderByAggregateInputSchema } from './EmailTemplateMaxOrderByAggregateInputSchema';
import { EmailTemplateMinOrderByAggregateInputSchema } from './EmailTemplateMinOrderByAggregateInputSchema';

export const EmailTemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailTemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  variables: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  previewData: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EmailTemplateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailTemplateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailTemplateMinOrderByAggregateInputSchema).optional()
}).strict();

export default EmailTemplateOrderByWithAggregationInputSchema;
