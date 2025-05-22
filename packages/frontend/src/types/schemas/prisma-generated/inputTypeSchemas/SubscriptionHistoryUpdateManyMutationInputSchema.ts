import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';
import { EnumSubscriptionStatusFieldUpdateOperationsInputSchema } from './EnumSubscriptionStatusFieldUpdateOperationsInputSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { NullableEnumPlanTypeFieldUpdateOperationsInputSchema } from './NullableEnumPlanTypeFieldUpdateOperationsInputSchema';
import { EnumPlanTypeFieldUpdateOperationsInputSchema } from './EnumPlanTypeFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const SubscriptionHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriptionHistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  planName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  stripeSubscriptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPlanType: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => NullableEnumPlanTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  newPlanType: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => EnumPlanTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default SubscriptionHistoryUpdateManyMutationInputSchema;
