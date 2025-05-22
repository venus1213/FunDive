import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleCreateManyInputSchema } from '../inputTypeSchemas/EmailScheduleCreateManyInputSchema'

export const EmailScheduleCreateManyArgsSchema: z.ZodType<Prisma.EmailScheduleCreateManyArgs> = z.object({
  data: z.union([ EmailScheduleCreateManyInputSchema,EmailScheduleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailScheduleCreateManyArgsSchema;
