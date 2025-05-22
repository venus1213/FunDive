import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleCreaterecipientIdsInputSchema } from './EmailScheduleCreaterecipientIdsInputSchema';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';
import { EmailScheduleExecutionLogCreateNestedManyWithoutScheduleInputSchema } from './EmailScheduleExecutionLogCreateNestedManyWithoutScheduleInputSchema';

export const EmailScheduleCreateWithoutTemplateInputSchema: z.ZodType<Prisma.EmailScheduleCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  recipientIds: z.union([ z.lazy(() => EmailScheduleCreaterecipientIdsInputSchema),z.string().array() ]).optional(),
  scheduleType: z.lazy(() => EmailScheduleTypeSchema),
  cronExpression: z.string().optional().nullable(),
  sendAt: z.coerce.date().optional().nullable(),
  variables: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  status: z.lazy(() => EmailScheduleStatusSchema).optional(),
  lastRunAt: z.coerce.date().optional().nullable(),
  nextRunAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  executionLogs: z.lazy(() => EmailScheduleExecutionLogCreateNestedManyWithoutScheduleInputSchema).optional()
}).strict();

export default EmailScheduleCreateWithoutTemplateInputSchema;
