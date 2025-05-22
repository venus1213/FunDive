import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema } from './EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { EmailScheduleUpdateOneRequiredWithoutExecutionLogsNestedInputSchema } from './EmailScheduleUpdateOneRequiredWithoutExecutionLogsNestedInputSchema';
import { EmailLogUpdateOneWithoutScheduleExecutionsNestedInputSchema } from './EmailLogUpdateOneWithoutScheduleExecutionsNestedInputSchema';

export const EmailScheduleExecutionLogUpdateInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => EmailScheduleExecutionStatusSchema),z.lazy(() => EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  error: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.lazy(() => EmailScheduleUpdateOneRequiredWithoutExecutionLogsNestedInputSchema).optional(),
  emailLog: z.lazy(() => EmailLogUpdateOneWithoutScheduleExecutionsNestedInputSchema).optional()
}).strict();

export default EmailScheduleExecutionLogUpdateInputSchema;
