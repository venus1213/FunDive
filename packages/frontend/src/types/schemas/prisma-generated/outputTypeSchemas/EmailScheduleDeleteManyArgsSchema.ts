import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleWhereInputSchema } from '../inputTypeSchemas/EmailScheduleWhereInputSchema'

export const EmailScheduleDeleteManyArgsSchema: z.ZodType<Prisma.EmailScheduleDeleteManyArgs> = z.object({
  where: EmailScheduleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailScheduleDeleteManyArgsSchema;
