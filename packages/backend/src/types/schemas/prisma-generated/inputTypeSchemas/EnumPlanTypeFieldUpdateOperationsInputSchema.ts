import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlanTypeSchema } from './PlanTypeSchema';

export const EnumPlanTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPlanTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PlanTypeSchema).optional()
}).strict();

export default EnumPlanTypeFieldUpdateOperationsInputSchema;
