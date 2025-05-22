import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailTemplateOrderByWithRelationInputSchema } from './EmailTemplateOrderByWithRelationInputSchema';
import { EmailABTestResultOrderByRelationAggregateInputSchema } from './EmailABTestResultOrderByRelationAggregateInputSchema';

export const EmailABTestOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailABTestOrderByWithRelationInput> = z.object({
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
  template: z.lazy(() => EmailTemplateOrderByWithRelationInputSchema).optional(),
  testResults: z.lazy(() => EmailABTestResultOrderByRelationAggregateInputSchema).optional()
}).strict();

export default EmailABTestOrderByWithRelationInputSchema;
