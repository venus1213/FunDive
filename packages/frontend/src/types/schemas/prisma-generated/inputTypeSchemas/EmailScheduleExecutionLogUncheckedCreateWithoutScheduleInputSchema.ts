import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInput> = z.object({
  id: z.string().uuid().optional(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  emailLogId: z.string().optional().nullable(),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailScheduleExecutionLogUncheckedCreateWithoutScheduleInputSchema;
