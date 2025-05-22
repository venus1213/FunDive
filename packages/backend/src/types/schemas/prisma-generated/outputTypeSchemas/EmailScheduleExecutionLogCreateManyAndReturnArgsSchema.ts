import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogCreateManyInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogCreateManyInputSchema'

export const EmailScheduleExecutionLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailScheduleExecutionLogCreateManyInputSchema,EmailScheduleExecutionLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailScheduleExecutionLogCreateManyAndReturnArgsSchema;
