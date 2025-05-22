import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { EnumEmailTemplateTypeFieldUpdateOperationsInputSchema } from './EnumEmailTemplateTypeFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { EmailLogUncheckedUpdateManyWithoutTemplateNestedInputSchema } from './EmailLogUncheckedUpdateManyWithoutTemplateNestedInputSchema';
import { EmailScheduleUncheckedUpdateManyWithoutTemplateNestedInputSchema } from './EmailScheduleUncheckedUpdateManyWithoutTemplateNestedInputSchema';

export const EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema: z.ZodType<Prisma.EmailTemplateUncheckedUpdateWithoutAbTestsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EmailTemplateTypeSchema),z.lazy(() => EnumEmailTemplateTypeFieldUpdateOperationsInputSchema) ]).optional(),
  variables: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  previewData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sentEmails: z.lazy(() => EmailLogUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  schedules: z.lazy(() => EmailScheduleUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export default EmailTemplateUncheckedUpdateWithoutAbTestsInputSchema;
