import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateArgsSchema } from "../outputTypeSchemas/EmailTemplateArgsSchema"
import { EmailABTestResultFindManyArgsSchema } from "../outputTypeSchemas/EmailABTestResultFindManyArgsSchema"
import { EmailABTestCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailABTestCountOutputTypeArgsSchema"

export const EmailABTestIncludeSchema: z.ZodType<Prisma.EmailABTestInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => EmailTemplateArgsSchema)]).optional(),
  testResults: z.union([z.boolean(),z.lazy(() => EmailABTestResultFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailABTestCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default EmailABTestIncludeSchema;
