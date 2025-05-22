import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailScheduleExecutionLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailScheduleExecutionLogOrderByRelationAggregateInputSchema;
