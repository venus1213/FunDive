import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailABTestOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailABTestOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailABTestOrderByRelationAggregateInputSchema;
