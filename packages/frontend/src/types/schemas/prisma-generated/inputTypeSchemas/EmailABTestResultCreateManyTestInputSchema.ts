import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const EmailABTestResultCreateManyTestInputSchema: z.ZodType<Prisma.EmailABTestResultCreateManyTestInput> = z.object({
  id: z.string().uuid().optional(),
  variant: z.string(),
  emailId: z.string(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export default EmailABTestResultCreateManyTestInputSchema;
