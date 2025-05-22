import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { EmailLogUpdaterecipientIdsInputSchema } from './EmailLogUpdaterecipientIdsInputSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { EnumEmailStatusFieldUpdateOperationsInputSchema } from './EnumEmailStatusFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { EmailTemplateUpdateOneRequiredWithoutSentEmailsNestedInputSchema } from './EmailTemplateUpdateOneRequiredWithoutSentEmailsNestedInputSchema';
import { UserUpdateOneRequiredWithoutSentEmailsNestedInputSchema } from './UserUpdateOneRequiredWithoutSentEmailsNestedInputSchema';
import { EmailABTestResultUpdateManyWithoutEmailNestedInputSchema } from './EmailABTestResultUpdateManyWithoutEmailNestedInputSchema';

export const EmailLogUpdateWithoutScheduleExecutionsInputSchema: z.ZodType<Prisma.EmailLogUpdateWithoutScheduleExecutionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipientIds: z.union([ z.lazy(() => EmailLogUpdaterecipientIdsInputSchema),z.string().array() ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmailStatusSchema),z.lazy(() => EnumEmailStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sentAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  errorDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template: z.lazy(() => EmailTemplateUpdateOneRequiredWithoutSentEmailsNestedInputSchema).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutSentEmailsNestedInputSchema).optional(),
  abTestResults: z.lazy(() => EmailABTestResultUpdateManyWithoutEmailNestedInputSchema).optional()
}).strict();

export default EmailLogUpdateWithoutScheduleExecutionsInputSchema;
