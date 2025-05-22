import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUpdateManyMutationInputSchema'
import { EmailScheduleExecutionLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogUncheckedUpdateManyInputSchema'
import { EmailScheduleExecutionLogWhereInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereInputSchema'

export const EmailScheduleExecutionLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailScheduleExecutionLogUpdateManyMutationInputSchema,EmailScheduleExecutionLogUncheckedUpdateManyInputSchema ]),
  where: EmailScheduleExecutionLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailScheduleExecutionLogUpdateManyAndReturnArgsSchema;
