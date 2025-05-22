import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateCreateManyInputSchema } from '../inputTypeSchemas/EmailTemplateCreateManyInputSchema'

export const EmailTemplateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailTemplateCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailTemplateCreateManyInputSchema,EmailTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailTemplateCreateManyAndReturnArgsSchema;
