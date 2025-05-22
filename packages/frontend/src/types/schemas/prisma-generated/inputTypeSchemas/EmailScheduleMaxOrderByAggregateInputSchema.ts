import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const EmailScheduleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmailScheduleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  scheduleType: z.lazy(() => SortOrderSchema).optional(),
  cronExpression: z.lazy(() => SortOrderSchema).optional(),
  sendAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastRunAt: z.lazy(() => SortOrderSchema).optional(),
  nextRunAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default EmailScheduleMaxOrderByAggregateInputSchema;
