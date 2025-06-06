import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailABTestUpdateManyMutationInputSchema'
import { EmailABTestUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailABTestUncheckedUpdateManyInputSchema'
import { EmailABTestWhereInputSchema } from '../inputTypeSchemas/EmailABTestWhereInputSchema'

export const EmailABTestUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailABTestUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailABTestUpdateManyMutationInputSchema,EmailABTestUncheckedUpdateManyInputSchema ]),
  where: EmailABTestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailABTestUpdateManyAndReturnArgsSchema;
