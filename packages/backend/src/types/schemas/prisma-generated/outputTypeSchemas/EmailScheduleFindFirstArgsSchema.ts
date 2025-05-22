import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleIncludeSchema } from '../inputTypeSchemas/EmailScheduleIncludeSchema'
import { EmailScheduleWhereInputSchema } from '../inputTypeSchemas/EmailScheduleWhereInputSchema'
import { EmailScheduleOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailScheduleOrderByWithRelationInputSchema'
import { EmailScheduleWhereUniqueInputSchema } from '../inputTypeSchemas/EmailScheduleWhereUniqueInputSchema'
import { EmailScheduleScalarFieldEnumSchema } from '../inputTypeSchemas/EmailScheduleScalarFieldEnumSchema'
import { EmailTemplateArgsSchema } from "../outputTypeSchemas/EmailTemplateArgsSchema"
import { EmailScheduleExecutionLogFindManyArgsSchema } from "../outputTypeSchemas/EmailScheduleExecutionLogFindManyArgsSchema"
import { EmailScheduleCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailScheduleCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EmailScheduleSelectSchema: z.ZodType<Prisma.EmailScheduleSelect> = z.object({
  id: z.boolean().optional(),
  templateId: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  recipientIds: z.boolean().optional(),
  scheduleType: z.boolean().optional(),
  cronExpression: z.boolean().optional(),
  sendAt: z.boolean().optional(),
  variables: z.boolean().optional(),
  status: z.boolean().optional(),
  lastRunAt: z.boolean().optional(),
  nextRunAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => EmailTemplateArgsSchema)]).optional(),
  executionLogs: z.union([z.boolean(),z.lazy(() => EmailScheduleExecutionLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailScheduleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EmailScheduleFindFirstArgsSchema: z.ZodType<Prisma.EmailScheduleFindFirstArgs> = z.object({
  select: EmailScheduleSelectSchema.optional(),
  include: z.lazy(() => EmailScheduleIncludeSchema).optional(),
  where: EmailScheduleWhereInputSchema.optional(),
  orderBy: z.union([ EmailScheduleOrderByWithRelationInputSchema.array(),EmailScheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailScheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailScheduleScalarFieldEnumSchema,EmailScheduleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default EmailScheduleFindFirstArgsSchema;
