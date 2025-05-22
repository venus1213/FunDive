import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';

export const EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmailScheduleExecutionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EmailScheduleExecutionStatusSchema).optional()
}).strict();

export default EnumEmailScheduleExecutionStatusFieldUpdateOperationsInputSchema;
