import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema } from './EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema';

export const EmailScheduleExecutionLogCreateWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateWithoutScheduleInput> = z.object({
  id: z.string().uuid().optional(),
  status: z.lazy(() => EmailScheduleExecutionStatusSchema),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailLog: z.lazy(() => EmailLogCreateNestedOneWithoutScheduleExecutionsInputSchema).optional()
}).strict();

export default EmailScheduleExecutionLogCreateWithoutScheduleInputSchema;
