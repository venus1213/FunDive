import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema } from './EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema';

export const EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateWithoutEmailLogInput> = z.object({
  id: z.string().uuid().optional(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  schedule: z.lazy(() => EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema)
}).strict();

export default EmailScheduleExecutionLogCreateWithoutEmailLogInputSchema;
