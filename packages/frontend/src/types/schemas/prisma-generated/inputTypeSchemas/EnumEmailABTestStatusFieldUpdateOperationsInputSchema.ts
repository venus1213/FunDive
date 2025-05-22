import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';

export const EnumEmailABTestStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmailABTestStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EmailABTestStatusSchema).optional()
}).strict();

export default EnumEmailABTestStatusFieldUpdateOperationsInputSchema;
