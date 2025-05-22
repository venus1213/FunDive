import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const EmailABTestResultUncheckedCreateInputSchema: z.ZodType<Prisma.EmailABTestResultUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  testId: z.string(),
  variant: z.string(),
  emailId: z.string(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailABTestResultUncheckedCreateInputSchema;
