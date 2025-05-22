import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailScheduleExecutionLogCountOrderByAggregateInputSchema } from './EmailScheduleExecutionLogCountOrderByAggregateInputSchema';
import { EmailScheduleExecutionLogMaxOrderByAggregateInputSchema } from './EmailScheduleExecutionLogMaxOrderByAggregateInputSchema';
import { EmailScheduleExecutionLogMinOrderByAggregateInputSchema } from './EmailScheduleExecutionLogMinOrderByAggregateInputSchema';

export const EmailScheduleExecutionLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  emailLogId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  error: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailScheduleExecutionLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailScheduleExecutionLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailScheduleExecutionLogMinOrderByAggregateInputSchema).optional()
}).strict();

export default EmailScheduleExecutionLogOrderByWithAggregationInputSchema;
