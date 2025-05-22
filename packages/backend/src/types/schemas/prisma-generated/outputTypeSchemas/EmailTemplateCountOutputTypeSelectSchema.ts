import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const EmailTemplateCountOutputTypeSelectSchema: z.ZodType<Prisma.EmailTemplateCountOutputTypeSelect> = z.object({
  sentEmails: z.boolean().optional(),
  abTests: z.boolean().optional(),
  schedules: z.boolean().optional(),
}).strict();

export default EmailTemplateCountOutputTypeSelectSchema;
