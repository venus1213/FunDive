import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleCreateManyInputSchema } from '../inputTypeSchemas/EmailScheduleCreateManyInputSchema'

export const EmailScheduleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailScheduleCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailScheduleCreateManyInputSchema,EmailScheduleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailScheduleCreateManyAndReturnArgsSchema;
