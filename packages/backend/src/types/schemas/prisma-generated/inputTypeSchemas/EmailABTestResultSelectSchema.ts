import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestArgsSchema } from "../outputTypeSchemas/EmailABTestArgsSchema"
import { EmailLogArgsSchema } from "../outputTypeSchemas/EmailLogArgsSchema"

export const EmailABTestResultSelectSchema: z.ZodType<Prisma.EmailABTestResultSelect> = z.object({
  id: z.boolean().optional(),
  testId: z.boolean().optional(),
  variant: z.boolean().optional(),
  emailId: z.boolean().optional(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  test: z.union([z.boolean(),z.lazy(() => EmailABTestArgsSchema)]).optional(),
  email: z.union([z.boolean(),z.lazy(() => EmailLogArgsSchema)]).optional(),
}).strict()

export default EmailABTestResultSelectSchema;
