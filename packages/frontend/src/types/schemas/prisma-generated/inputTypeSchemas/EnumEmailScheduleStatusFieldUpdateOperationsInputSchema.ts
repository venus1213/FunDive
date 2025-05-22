import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';

export const EnumEmailScheduleStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmailScheduleStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EmailScheduleStatusSchema).optional()
}).strict();

export default EnumEmailScheduleStatusFieldUpdateOperationsInputSchema;
