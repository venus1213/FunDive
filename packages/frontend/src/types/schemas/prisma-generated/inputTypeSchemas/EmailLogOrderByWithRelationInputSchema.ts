import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailTemplateOrderByWithRelationInputSchema } from './EmailTemplateOrderByWithRelationInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { EmailABTestResultOrderByRelationAggregateInputSchema } from './EmailABTestResultOrderByRelationAggregateInputSchema';
import { EmailScheduleExecutionLogOrderByRelationAggregateInputSchema } from './EmailScheduleExecutionLogOrderByRelationAggregateInputSchema';

export const EmailLogOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  recipientIds: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sentAt: z.lazy(() => SortOrderSchema).optional(),
  sentBy: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  errorDetails: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  template: z.lazy(() => EmailTemplateOrderByWithRelationInputSchema).optional(),
  sender: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  abTestResults: z.lazy(() => EmailABTestResultOrderByRelationAggregateInputSchema).optional(),
  scheduleExecutions: z.lazy(() => EmailScheduleExecutionLogOrderByRelationAggregateInputSchema).optional()
}).strict();

export default EmailLogOrderByWithRelationInputSchema;
