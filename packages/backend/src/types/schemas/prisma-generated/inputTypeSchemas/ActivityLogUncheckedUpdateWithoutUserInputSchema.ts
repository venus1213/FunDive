import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { ActionTypeSchema } from './ActionTypeSchema';
import { EnumActionTypeFieldUpdateOperationsInputSchema } from './EnumActionTypeFieldUpdateOperationsInputSchema';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';
import { EnumActivityTargetTypeFieldUpdateOperationsInputSchema } from './EnumActivityTargetTypeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const ActivityLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ActivityLogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => ActionTypeSchema),z.lazy(() => EnumActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ActivityTargetTypeSchema),z.lazy(() => EnumActivityTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  details: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default ActivityLogUncheckedUpdateWithoutUserInputSchema;
