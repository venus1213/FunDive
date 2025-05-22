import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailTemplateUpdateManyMutationInputSchema'
import { EmailTemplateUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailTemplateUncheckedUpdateManyInputSchema'
import { EmailTemplateWhereInputSchema } from '../inputTypeSchemas/EmailTemplateWhereInputSchema'

export const EmailTemplateUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailTemplateUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailTemplateUpdateManyMutationInputSchema,EmailTemplateUncheckedUpdateManyInputSchema ]),
  where: EmailTemplateWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailTemplateUpdateManyAndReturnArgsSchema;
