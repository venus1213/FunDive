import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogIncludeSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogIncludeSchema'
import { EmailScheduleExecutionLogWhereInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereInputSchema'
import { EmailScheduleExecutionLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogOrderByWithRelationInputSchema'
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereUniqueInputSchema'
import { EmailScheduleExecutionLogScalarFieldEnumSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogScalarFieldEnumSchema'
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

export const EmailScheduleExecutionLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogFindFirstOrThrowArgs> = z.object({
  select: EmailScheduleExecutionLogSelectSchema.optional(),
  include: z.lazy(() => EmailScheduleExecutionLogIncludeSchema).optional(),
  where: EmailScheduleExecutionLogWhereInputSchema.optional(),
  orderBy: z.union([ EmailScheduleExecutionLogOrderByWithRelationInputSchema.array(),EmailScheduleExecutionLogOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailScheduleExecutionLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailScheduleExecutionLogScalarFieldEnumSchema,EmailScheduleExecutionLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default EmailScheduleExecutionLogFindFirstOrThrowArgsSchema;
