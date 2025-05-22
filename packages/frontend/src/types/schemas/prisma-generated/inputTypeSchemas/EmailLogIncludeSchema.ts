import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateArgsSchema } from "../outputTypeSchemas/EmailTemplateArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { EmailABTestResultFindManyArgsSchema } from "../outputTypeSchemas/EmailABTestResultFindManyArgsSchema"
import { EmailScheduleExecutionLogFindManyArgsSchema } from "../outputTypeSchemas/EmailScheduleExecutionLogFindManyArgsSchema"
import { EmailLogCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailLogCountOutputTypeArgsSchema"

export const EmailLogIncludeSchema: z.ZodType<Prisma.EmailLogInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => EmailTemplateArgsSchema)]).optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  abTestResults: z.union([z.boolean(),z.lazy(() => EmailABTestResultFindManyArgsSchema)]).optional(),
  scheduleExecutions: z.union([z.boolean(),z.lazy(() => EmailScheduleExecutionLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailLogCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default EmailLogIncludeSchema;
