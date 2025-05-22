import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleExecutionLogWhereInputSchema } from '../inputTypeSchemas/EmailScheduleExecutionLogWhereInputSchema'

export const EmailScheduleExecutionLogDeleteManyArgsSchema: z.ZodType<Prisma.EmailScheduleExecutionLogDeleteManyArgs> = z.object({
  where: EmailScheduleExecutionLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailScheduleExecutionLogDeleteManyArgsSchema;
