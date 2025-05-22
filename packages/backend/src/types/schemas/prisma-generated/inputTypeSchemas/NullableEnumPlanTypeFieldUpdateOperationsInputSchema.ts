import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';

export const NullableEnumPlanTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumPlanTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PlanTypeSchema).optional().nullable()
}).strict();

export default NullableEnumPlanTypeFieldUpdateOperationsInputSchema;
