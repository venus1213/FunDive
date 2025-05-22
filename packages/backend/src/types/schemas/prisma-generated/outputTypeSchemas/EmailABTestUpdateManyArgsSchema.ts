import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailABTestUpdateManyMutationInputSchema'
import { EmailABTestUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailABTestUncheckedUpdateManyInputSchema'
import { EmailABTestWhereInputSchema } from '../inputTypeSchemas/EmailABTestWhereInputSchema'

export const EmailABTestUpdateManyArgsSchema: z.ZodType<Prisma.EmailABTestUpdateManyArgs> = z.object({
  data: z.union([ EmailABTestUpdateManyMutationInputSchema,EmailABTestUncheckedUpdateManyInputSchema ]),
  where: EmailABTestWhereInputSchema.optional(),
}).strict() ;

export default EmailABTestUpdateManyArgsSchema;
