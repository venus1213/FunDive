import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const EmailABTestCountOutputTypeSelectSchema: z.ZodType<Prisma.EmailABTestCountOutputTypeSelect> = z.object({
  testResults: z.boolean().optional(),
}).strict();

export default EmailABTestCountOutputTypeSelectSchema;
