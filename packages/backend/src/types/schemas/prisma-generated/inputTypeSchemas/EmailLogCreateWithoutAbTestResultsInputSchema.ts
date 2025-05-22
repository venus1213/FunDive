import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreaterecipientIdsInputSchema } from './EmailLogCreaterecipientIdsInputSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { EmailTemplateCreateNestedOneWithoutSentEmailsInputSchema } from './EmailTemplateCreateNestedOneWithoutSentEmailsInputSchema';
import { UserCreateNestedOneWithoutSentEmailsInputSchema } from './UserCreateNestedOneWithoutSentEmailsInputSchema';
import { EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema } from './EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema';

export const EmailLogCreateWithoutAbTestResultsInputSchema: z.ZodType<Prisma.EmailLogCreateWithoutAbTestResultsInput> = z.object({
  id: z.string().optional(),
  recipientIds: z.union([ z.lazy(() => EmailLogCreaterecipientIdsInputSchema),z.string().array() ]).optional(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => EmailStatusSchema),
  sentAt: z.coerce.date().optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  errorDetails: z.string().optional().nullable(),
  template: z.lazy(() => EmailTemplateCreateNestedOneWithoutSentEmailsInputSchema),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentEmailsInputSchema),
  scheduleExecutions: z.lazy(() => EmailScheduleExecutionLogCreateNestedManyWithoutEmailLogInputSchema).optional()
}).strict();

export default EmailLogCreateWithoutAbTestResultsInputSchema;
