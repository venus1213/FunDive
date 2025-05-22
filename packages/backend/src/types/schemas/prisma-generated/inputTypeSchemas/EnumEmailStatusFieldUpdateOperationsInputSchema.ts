import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailStatusSchema } from './EmailStatusSchema';

export const EnumEmailStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmailStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EmailStatusSchema).optional()
}).strict();

export default EnumEmailStatusFieldUpdateOperationsInputSchema;
