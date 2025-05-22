import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleArgsSchema } from "../outputTypeSchemas/EmailScheduleArgsSchema"
import { EmailLogArgsSchema } from "../outputTypeSchemas/EmailLogArgsSchema"

export const EmailScheduleExecutionLogIncludeSchema: z.ZodType<Prisma.EmailScheduleExecutionLogInclude> = z.object({
  schedule: z.union([z.boolean(),z.lazy(() => EmailScheduleArgsSchema)]).optional(),
  emailLog: z.union([z.boolean(),z.lazy(() => EmailLogArgsSchema)]).optional(),
}).strict()

export default EmailScheduleExecutionLogIncludeSchema;
