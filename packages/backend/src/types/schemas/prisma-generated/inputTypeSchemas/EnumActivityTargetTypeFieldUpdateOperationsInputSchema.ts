import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';

export const EnumActivityTargetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumActivityTargetTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ActivityTargetTypeSchema).optional()
}).strict();

export default EnumActivityTargetTypeFieldUpdateOperationsInputSchema;
