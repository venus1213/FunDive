import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const EmailScheduleExecutionLogCreateManyEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateManyEmailLogInput> = z.object({
  id: z.string().optional(),
  scheduleId: z.string(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailScheduleExecutionLogCreateManyEmailLogInputSchema;
