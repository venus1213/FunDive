import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogWhereInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereInputSchema'
import { EmailScheduleExecutionLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogOrderByWithRelationInputSchema'
import { EmailScheduleExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereUniqueInputSchema'

export const EmailScheduleExecutionLogAggregateArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogAggregateArgs> = z.object({
  where: EmailScheduleExecutionLogWhereInputSchema.optional(),
  orderBy: z.union([ EmailScheduleExecutionLogOrderByWithRelationInputSchema.array(),EmailScheduleExecutionLogOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailScheduleExecutionLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailScheduleExecutionLogAggregateArgsSchema;
