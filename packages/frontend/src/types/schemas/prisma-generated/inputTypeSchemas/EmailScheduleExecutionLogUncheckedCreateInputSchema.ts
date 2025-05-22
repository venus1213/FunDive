import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const EmailScheduleExecutionLogUncheckedCreateInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  scheduleId: z.string(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  emailLogId: z.string().optional().nullable(),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailScheduleExecutionLogUncheckedCreateInputSchema;
