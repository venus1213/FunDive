import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailTemplateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailTemplateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailTemplateOrderByRelationAggregateInputSchema;
