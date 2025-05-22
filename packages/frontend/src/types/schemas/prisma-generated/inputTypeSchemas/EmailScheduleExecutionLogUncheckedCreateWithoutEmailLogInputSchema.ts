import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInput> = z.object({
  id: z.string().uuid().optional(),
  scheduleId: z.string(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailScheduleExecutionLogUncheckedCreateWithoutEmailLogInputSchema;
