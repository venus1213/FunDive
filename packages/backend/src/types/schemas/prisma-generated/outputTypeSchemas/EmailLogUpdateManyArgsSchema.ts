import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailLogUpdateManyMutationInputSchema'
import { EmailLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailLogUncheckedUpdateManyInputSchema'
import { EmailLogWhereInputSchema } from '../inputTypeSchemas/EmailLogWhereInputSchema'

export const EmailLogUpdateManyArgsSchema: z.ZodType<Prisma.EmailLogUpdateManyArgs> = z.object({
  data: z.union([ EmailLogUpdateManyMutationInputSchema,EmailLogUncheckedUpdateManyInputSchema ]),
  where: EmailLogWhereInputSchema.optional(),
}).strict() ;

export default EmailLogUpdateManyArgsSchema;
