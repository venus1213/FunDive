import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailTemplateOrderByWithRelationInputSchema } from './EmailTemplateOrderByWithRelationInputSchema';
import { EmailScheduleExecutionLogOrderByRelationAggregateInputSchema } from './EmailScheduleExecutionLogOrderByRelationAggregateInputSchema';

export const EmailScheduleOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailScheduleOrderByWithRelationInput> = z.object({
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
  template: z.lazy(() => EmailTemplateOrderByWithRelationInputSchema).optional(),
  executionLogs: z.lazy(() => EmailScheduleExecutionLogOrderByRelationAggregateInputSchema).optional()
}).strict();

export default EmailScheduleOrderByWithRelationInputSchema;
