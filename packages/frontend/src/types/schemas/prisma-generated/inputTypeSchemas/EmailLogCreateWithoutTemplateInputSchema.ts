import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreaterecipientIdsInputSchema } from './EmailLogCreaterecipientIdsInputSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { UserCreateNestedOneWithoutSentEmailsInputSchema } from './UserCreateNestedOneWithoutSentEmailsInputSchema';
import { EmailABTestResultCreateNestedManyWithoutEmailInputSchema } from './EmailABTestResultCreateNestedManyWithoutEmailInputSchema';
import { EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema';

export const EmailLogCreateWithoutTemplateInputSchema: z.ZodType<Prisma.EmailLogCreateWithoutTemplateInput> = z.object({
  id: z.string().uuid().optional(),
  recipientIds: z.union([ z.lazy(() => EmailLogCreaterecipientIdsInputSchema),z.string().array() ]).optional(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => EmailStatusSchema),
  sentAt: z.coerce.date().optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  errorDetails: z.string().optional().nullable(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentEmailsInputSchema),
  abTestResults: z.lazy(() => EmailABTestResultCreateNestedManyWithoutEmailInputSchema).optional(),
  scheduleExecutions: z.lazy(() => EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema).optional()
}).strict();

export default EmailLogCreateWithoutTemplateInputSchema;
