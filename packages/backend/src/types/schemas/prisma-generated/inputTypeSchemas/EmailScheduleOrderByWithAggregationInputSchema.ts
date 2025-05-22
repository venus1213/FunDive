import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailScheduleCountOrderByAggregateInputSchema } from './EmailScheduleCountOrderByAggregateInputSchema';
import { EmailScheduleMaxOrderByAggregateInputSchema } from './EmailScheduleMaxOrderByAggregateInputSchema';
import { EmailScheduleMinOrderByAggregateInputSchema } from './EmailScheduleMinOrderByAggregateInputSchema';

export const EmailScheduleOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailScheduleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  recipientIds: z.lazy(() => SortOrderSchema).optional(),
  scheduleType: z.lazy(() => SortOrderSchema).optional(),
  cronExpression: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sendAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  variables: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastRunAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextRunAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailScheduleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailScheduleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailScheduleMinOrderByAggregateInputSchema).optional()
}).strict();

export default EmailScheduleOrderByWithAggregationInputSchema;
