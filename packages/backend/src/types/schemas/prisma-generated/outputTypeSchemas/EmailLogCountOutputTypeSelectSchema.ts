import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const EmailLogCountOutputTypeSelectSchema: z.ZodType<Prisma.EmailLogCountOutputTypeSelect> = z.object({
  abTestResults: z.boolean().optional(),
  scheduleExecutions: z.boolean().optional(),
}).strict();

export default EmailLogCountOutputTypeSelectSchema;
