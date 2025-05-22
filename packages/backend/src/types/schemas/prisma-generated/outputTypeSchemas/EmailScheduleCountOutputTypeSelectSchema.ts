import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const EmailScheduleCountOutputTypeSelectSchema: z.ZodType<Prisma.EmailScheduleCountOutputTypeSelect> = z.object({
  executionLogs: z.boolean().optional(),
}).strict();

export default EmailScheduleCountOutputTypeSelectSchema;
