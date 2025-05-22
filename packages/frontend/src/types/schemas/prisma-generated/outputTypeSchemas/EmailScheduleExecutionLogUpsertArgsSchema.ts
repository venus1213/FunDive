import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogIncludeSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogIncludeSchema'
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereUniqueInputSchema'
import { EmailScheduleExecutionLogCreateInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogCreateInputSchema'
import { EmailScheduleExecutionLogUncheckedCreateInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUncheckedCreateInputSchema'
import { EmailScheduleExecutionLogUpdateInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUpdateInputSchema'
import { EmailScheduleExecutionLogUncheckedUpdateInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUncheckedUpdateInputSchema'
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

export const EmailScheduleExecutionLogUpsertArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpsertArgs> = z.object({
  select: EmailScheduleExecutionLogSelectSchema.optional(),
  include: z.lazy(() => EmailScheduleExecutionLogIncludeSchema).optional(),
  where: EmailScheduleExecutionLogWhereUniqueInputSchema,
  create: z.union([ EmailScheduleExecutionLogCreateInputSchema,EmailScheduleExecutionLogUncheckedCreateInputSchema ]),
  update: z.union([ EmailScheduleExecutionLogUpdateInputSchema,EmailScheduleExecutionLogUncheckedUpdateInputSchema ]),
}).strict() ;

export default EmailScheduleExecutionLogUpsertArgsSchema;
