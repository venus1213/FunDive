import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema } from './EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmailScheduleExecutionStatusSchema),z.lazy(() => EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  emailLogId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default EmailScheduleExecutionLogUncheckedUpdateWithoutScheduleInputSchema;
