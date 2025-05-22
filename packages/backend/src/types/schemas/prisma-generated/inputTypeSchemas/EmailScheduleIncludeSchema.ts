import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateArgsSchema } from "../outputTypeSchemas/EmailTemplateArgsSchema"
import { EmailScheduleExecutionLogFindManyArgsSchema } from "../outputTypeSchemas/EmailScheduleExecutionLogFindManyArgsSchema"
import { EmailScheduleCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailScheduleCountOutputTypeArgsSchema"

export const EmailScheduleIncludeSchema: z.ZodType<Prisma.EmailScheduleInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => EmailTemplateArgsSchema)]).optional(),
  executionLogs: z.union([z.boolean(),z.lazy(() => EmailScheduleExecutionLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailScheduleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default EmailScheduleIncludeSchema;
