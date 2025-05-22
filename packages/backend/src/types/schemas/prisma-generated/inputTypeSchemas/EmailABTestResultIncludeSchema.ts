import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestArgsSchema } from "../outputTypeSchemas/EmailABTestArgsSchema"
import { EmailLogArgsSchema } from "../outputTypeSchemas/EmailLogArgsSchema"

export const EmailABTestResultIncludeSchema: z.ZodType<Prisma.EmailABTestResultInclude> = z.object({
  test: z.union([z.boolean(),z.lazy(() => EmailABTestArgsSchema)]).optional(),
  email: z.union([z.boolean(),z.lazy(() => EmailLogArgsSchema)]).optional(),
}).strict()

export default EmailABTestResultIncludeSchema;
