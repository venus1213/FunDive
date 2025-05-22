import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { EmailLogFindManyArgsSchema } from "../outputTypeSchemas/EmailLogFindManyArgsSchema"
import { EmailABTestFindManyArgsSchema } from "../outputTypeSchemas/EmailABTestFindManyArgsSchema"
import { EmailScheduleFindManyArgsSchema } from "../outputTypeSchemas/EmailScheduleFindManyArgsSchema"
import { EmailTemplateCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailTemplateCountOutputTypeArgsSchema"

export const EmailTemplateSelectSchema: z.ZodType<Prisma.EmailTemplateSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  subject: z.boolean().optional(),
  body: z.boolean().optional(),
  type: z.boolean().optional(),
  variables: z.boolean().optional(),
  isActive: z.boolean().optional(),
  previewData: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdBy: z.boolean().optional(),
  updatedBy: z.boolean().optional(),
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  updater: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sentEmails: z.union([z.boolean(),z.lazy(() => EmailLogFindManyArgsSchema)]).optional(),
  abTests: z.union([z.boolean(),z.lazy(() => EmailABTestFindManyArgsSchema)]).optional(),
  schedules: z.union([z.boolean(),z.lazy(() => EmailScheduleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default EmailTemplateSelectSchema;
