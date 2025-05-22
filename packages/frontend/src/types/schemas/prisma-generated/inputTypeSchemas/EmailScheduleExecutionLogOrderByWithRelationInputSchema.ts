import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { EmailScheduleOrderByWithRelationInputSchema } from './EmailScheduleOrderByWithRelationInputSchema';
import { EmailLogOrderByWithRelationInputSchema } from './EmailLogOrderByWithRelationInputSchema';

export const EmailScheduleExecutionLogOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scheduleId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  emailLogId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  error: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => EmailScheduleOrderByWithRelationInputSchema).optional(),
  emailLog: z.lazy(() => EmailLogOrderByWithRelationInputSchema).optional()
}).strict();

export default EmailScheduleExecutionLogOrderByWithRelationInputSchema;
