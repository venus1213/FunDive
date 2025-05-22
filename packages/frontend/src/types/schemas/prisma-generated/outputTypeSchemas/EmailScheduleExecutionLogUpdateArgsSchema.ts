import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogIncludeSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogIncludeSchema'
import { EmailScheduleExecutionLogUpdateInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUpdateInputSchema'
import { EmailScheduleExecutionLogUncheckedUpdateInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUncheckedUpdateInputSchema'
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereUniqueInputSchema'
import { EmailScheduleArgsSchema } from "../outputTypeSchemas/EmailScheduleArgsSchema"
import { EmailLogArgsSchema } from "../outputTypeSchemas/EmailLogArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EmailScheduleExecutionLogSelectSchema: z.ZodType<Prisma.EmailScheduleExecutionLogSelect> = z.object({
  id: z.boolean().optional(),
  scheduleId: z.boolean().optional(),
  status: z.boolean().optional(),
  emailLogId: z.boolean().optional(),
  error: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  schedule: z.union([z.boolean(),z.lazy(() => EmailScheduleArgsSchema)]).optional(),
  emailLog: z.union([z.boolean(),z.lazy(() => EmailLogArgsSchema)]).optional(),
}).strict()

export const EmailScheduleExecutionLogUpdateArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateArgs> = z.object({
  select: EmailScheduleExecutionLogSelectSchema.optional(),
  include: z.lazy(() => EmailScheduleExecutionLogIncludeSchema).optional(),
  data: z.union([ EmailScheduleExecutionLogUpdateInputSchema,EmailScheduleExecutionLogUncheckedUpdateInputSchema ]),
  where: EmailScheduleExecutionLogWhereUniqueInputSchema,
}).strict() ;

export default EmailScheduleExecutionLogUpdateArgsSchema;
