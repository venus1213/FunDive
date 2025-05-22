import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';

export const EnumEmailScheduleTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmailScheduleTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EmailScheduleTypeSchema).optional()
}).strict();

export default EnumEmailScheduleTypeFieldUpdateOperationsInputSchema;
