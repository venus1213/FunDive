import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { EmailLogOrderByRelationAggregateInputSchema } from './EmailLogOrderByRelationAggregateInputSchema';
import { EmailABTestOrderByRelationAggregateInputSchema } from './EmailABTestOrderByRelationAggregateInputSchema';
import { EmailScheduleOrderByRelationAggregateInputSchema } from './EmailScheduleOrderByRelationAggregateInputSchema';

export const EmailTemplateOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailTemplateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  variables: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  previewData: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  updater: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogOrderByRelationAggregateInputSchema).optional(),
  abTests: z.lazy(() => EmailABTestOrderByRelationAggregateInputSchema).optional(),
  schedules: z.lazy(() => EmailScheduleOrderByRelationAggregateInputSchema).optional()
}).strict();

export default EmailTemplateOrderByWithRelationInputSchema;
