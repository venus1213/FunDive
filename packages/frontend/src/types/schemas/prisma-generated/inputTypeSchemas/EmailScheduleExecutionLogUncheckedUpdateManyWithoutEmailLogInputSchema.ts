import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema } from './EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const EmailScheduleExecutionLogUncheckedUpdateManyWithoutEmailLogInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUncheckedUpdateManyWithoutEmailLogInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scheduleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmailScheduleExecutionStatusSchema),z.lazy(() => EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default EmailScheduleExecutionLogUncheckedUpdateManyWithoutEmailLogInputSchema;
