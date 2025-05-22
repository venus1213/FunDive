import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateCreateManyInputSchema } from '../inputTypeSchemas/EmailTemplateCreateManyInputSchema'

export const EmailTemplateCreateManyArgsSchema: z.ZodType<Prisma.EmailTemplateCreateManyArgs> = z.object({
  data: z.union([ EmailTemplateCreateManyInputSchema,EmailTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailTemplateCreateManyArgsSchema;
