import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailLogUpdateManyMutationInputSchema'
import { EmailLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailLogUncheckedUpdateManyInputSchema'
import { EmailLogWhereInputSchema } from '../inputTypeSchemas/EmailLogWhereInputSchema'

export const EmailLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailLogUpdateManyMutationInputSchema,EmailLogUncheckedUpdateManyInputSchema ]),
  where: EmailLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailLogUpdateManyAndReturnArgsSchema;
