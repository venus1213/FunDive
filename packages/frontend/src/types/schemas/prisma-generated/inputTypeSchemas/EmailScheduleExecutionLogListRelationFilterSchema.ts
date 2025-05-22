import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionLogWhereInputSchema } from './EmailScheduleExecutionLogWhereInputSchema';

export const EmailScheduleExecutionLogListRelationFilterSchema: z.ZodType<Prisma.EmailScheduleExecutionLogListRelationFilter> = z.object({
  every: z.lazy(() => EmailScheduleExecutionLogWhereInputSchema).optional(),
  some: z.lazy(() => EmailScheduleExecutionLogWhereInputSchema).optional(),
  none: z.lazy(() => EmailScheduleExecutionLogWhereInputSchema).optional()
}).strict();

export default EmailScheduleExecutionLogListRelationFilterSchema;
