import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailABTestResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailABTestResultOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailABTestResultOrderByRelationAggregateInputSchema;
