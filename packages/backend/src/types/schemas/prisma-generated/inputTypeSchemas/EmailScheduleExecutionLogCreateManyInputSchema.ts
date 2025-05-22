import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const EmailScheduleExecutionLogCreateManyInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateManyInput> = z.object({
  id: z.string().optional(),
  scheduleId: z.string(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  emailLogId: z.string().optional().nullable(),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailScheduleExecutionLogCreateManyInputSchema;
