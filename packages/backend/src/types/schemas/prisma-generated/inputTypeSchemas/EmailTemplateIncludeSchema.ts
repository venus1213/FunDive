import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { EmailLogFindManyArgsSchema } from "../outputTypeSchemas/EmailLogFindManyArgsSchema"
import { EmailABTestFindManyArgsSchema } from "../outputTypeSchemas/EmailABTestFindManyArgsSchema"
import { EmailScheduleFindManyArgsSchema } from "../outputTypeSchemas/EmailScheduleFindManyArgsSchema"
import { EmailTemplateCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailTemplateCountOutputTypeArgsSchema"

export const EmailTemplateIncludeSchema: z.ZodType<Prisma.EmailTemplateInclude> = z.object({
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  updater: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sentEmails: z.union([z.boolean(),z.lazy(() => EmailLogFindManyArgsSchema)]).optional(),
  abTests: z.union([z.boolean(),z.lazy(() => EmailABTestFindManyArgsSchema)]).optional(),
  schedules: z.union([z.boolean(),z.lazy(() => EmailScheduleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default EmailTemplateIncludeSchema;
