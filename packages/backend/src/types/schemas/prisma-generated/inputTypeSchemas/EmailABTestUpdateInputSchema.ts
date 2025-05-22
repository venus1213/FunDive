import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { EnumEmailABTestStatusFieldUpdateOperationsInputSchema } from './EnumEmailABTestStatusFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { EmailTemplateUpdateOneRequiredWithoutAbTestsNestedInputSchema } from './EmailTemplateUpdateOneRequiredWithoutAbTestsNestedInputSchema';
import { EmailABTestResultUpdateManyWithoutTestNestedInputSchema } from './EmailABTestResultUpdateManyWithoutTestNestedInputSchema';

export const EmailABTestUpdateInputSchema: z.ZodType<Prisma.EmailABTestUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantA: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  variantB: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmailABTestStatusSchema),z.lazy(() => EnumEmailABTestStatusFieldUpdateOperationsInputSchema) ]).optional(),
  winningVariant: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metrics: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => EmailTemplateUpdateOneRequiredWithoutAbTestsNestedInputSchema).optional(),
  testResults: z.lazy(() => EmailABTestResultUpdateManyWithoutTestNestedInputSchema).optional()
}).strict();

export default EmailABTestUpdateInputSchema;
