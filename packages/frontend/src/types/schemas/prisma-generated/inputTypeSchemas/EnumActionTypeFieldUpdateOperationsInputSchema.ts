import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActionTypeSchema } from './ActionTypeSchema';

export const EnumActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ActionTypeSchema).optional()
}).strict();

export default EnumActionTypeFieldUpdateOperationsInputSchema;
