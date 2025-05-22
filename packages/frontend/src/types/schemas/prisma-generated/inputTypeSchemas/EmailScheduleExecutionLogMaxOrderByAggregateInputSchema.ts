import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailScheduleExecutionLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  emailLogId: z.lazy(() => SortOrderSchema).optional(),
  error: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailScheduleExecutionLogMaxOrderByAggregateInputSchema;
