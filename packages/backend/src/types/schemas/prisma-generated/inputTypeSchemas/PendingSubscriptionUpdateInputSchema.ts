import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { EnumPlanTypeFieldUpdateOperationsInputSchema } from './EnumPlanTypeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutPendingSubscriptionNestedInputSchema } from './UserUpdateOneRequiredWithoutPendingSubscriptionNestedInputSchema';

export const PendingSubscriptionUpdateInputSchema: z.ZodType<Prisma.PendingSubscriptionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  planType: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => EnumPlanTypeFieldUpdateOperationsInputSchema) ]).optional(),
  billingCycle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPendingSubscriptionNestedInputSchema).optional()
}).strict();

export default PendingSubscriptionUpdateInputSchema;
