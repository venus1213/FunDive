import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateArgsSchema } from "../outputTypeSchemas/EmailTemplateArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { EmailABTestResultFindManyArgsSchema } from "../outputTypeSchemas/EmailABTestResultFindManyArgsSchema"
import { EmailScheduleExecutionLogFindManyArgsSchema } from "../outputTypeSchemas/EmailScheduleExecutionLogFindManyArgsSchema"
import { EmailLogCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailLogCountOutputTypeArgsSchema"

export const EmailLogSelectSchema: z.ZodType<Prisma.EmailLogSelect> = z.object({
  id: z.boolean().optional(),
  templateId: z.boolean().optional(),
  recipientIds: z.boolean().optional(),
  subject: z.boolean().optional(),
  body: z.boolean().optional(),
  status: z.boolean().optional(),
  sentAt: z.boolean().optional(),
  sentBy: z.boolean().optional(),
  metadata: z.boolean().optional(),
  errorDetails: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => EmailTemplateArgsSchema)]).optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  abTestResults: z.union([z.boolean(),z.lazy(() => EmailABTestResultFindManyArgsSchema)]).optional(),
  scheduleExecutions: z.union([z.boolean(),z.lazy(() => EmailScheduleExecutionLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailLogCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default EmailLogSelectSchema;
