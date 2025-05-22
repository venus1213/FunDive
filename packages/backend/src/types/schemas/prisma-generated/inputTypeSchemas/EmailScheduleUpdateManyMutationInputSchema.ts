import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { EmailScheduleUpdaterecipientIdsInputSchema } from './EmailScheduleUpdaterecipientIdsInputSchema';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';
import { EnumEmailScheduleTypeFieldUpdateOperationsInputSchema } from './EnumEmailScheduleTypeFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';
import { EnumEmailScheduleStatusFieldUpdateOperationsInputSchema } from './EnumEmailScheduleStatusFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const EmailScheduleUpdateManyMutationInputSchema: z.ZodType<Prisma.EmailScheduleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recipientIds: z.union([ z.lazy(() => EmailScheduleUpdaterecipientIdsInputSchema),z.string().array() ]).optional(),
  scheduleType: z.union([ z.lazy(() => EmailScheduleTypeSchema),z.lazy(() => EnumEmailScheduleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  cronExpression: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sendAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variables: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  status: z.union([ z.lazy(() => EmailScheduleStatusSchema),z.lazy(() => EnumEmailScheduleStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastRunAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextRunAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default EmailScheduleUpdateManyMutationInputSchema;
