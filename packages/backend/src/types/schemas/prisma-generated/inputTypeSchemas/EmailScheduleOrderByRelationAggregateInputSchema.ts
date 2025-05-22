import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailScheduleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailScheduleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailScheduleOrderByRelationAggregateInputSchema;
