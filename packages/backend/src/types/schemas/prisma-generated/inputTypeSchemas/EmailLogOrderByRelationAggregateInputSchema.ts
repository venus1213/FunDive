import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailLogOrderByRelationAggregateInputSchema;
