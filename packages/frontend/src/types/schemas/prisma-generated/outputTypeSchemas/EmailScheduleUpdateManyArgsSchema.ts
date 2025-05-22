import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailScheduleUpdateManyMutationInputSchema'
import { EmailScheduleUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailScheduleUncheckedUpdateManyInputSchema'
import { EmailScheduleWhereInputSchema } from '../inputTypeSchemas/EmailScheduleWhereInputSchema'

export const EmailScheduleUpdateManyArgsSchema: z.ZodType<Prisma.EmailScheduleUpdateManyArgs> = z.object({
  data: z.union([ EmailScheduleUpdateManyMutationInputSchema,EmailScheduleUncheckedUpdateManyInputSchema ]),
  where: EmailScheduleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailScheduleUpdateManyArgsSchema;
