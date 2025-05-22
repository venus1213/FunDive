import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogWhereInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereInputSchema'
import { EmailScheduleExecutionLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogOrderByWithAggregationInputSchema'
import { EmailScheduleExecutionLogScalarFieldEnumSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogScalarFieldEnumSchema'
import { EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema'

export const EmailScheduleExecutionLogGroupByArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogGroupByArgs> = z.object({
  where: EmailScheduleExecutionLogWhereInputSchema.optional(),
  orderBy: z.union([ EmailScheduleExecutionLogOrderByWithAggregationInputSchema.array(),EmailScheduleExecutionLogOrderByWithAggregationInputSchema ]).optional(),
  by: EmailScheduleExecutionLogScalarFieldEnumSchema.array(),
  having: EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailScheduleExecutionLogGroupByArgsSchema;
