import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema } from './EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema';
import { EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema } from './EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema';

export const EmailScheduleExecutionLogCreateInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateInput> = z.object({
  id: z.string().uuid().optional(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  schedule: z.lazy(() => EmailScheduleCreateNestedOneWithoutExecutionLogsInputSchema),
  emailLog: z.lazy(() => EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema).optional()
}).strict();

export default EmailScheduleExecutionLogCreateInputSchema;
