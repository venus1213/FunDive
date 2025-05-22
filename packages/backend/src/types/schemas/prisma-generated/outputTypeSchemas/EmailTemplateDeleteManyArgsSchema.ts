import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateWhereInputSchema } from '../inputTypeSchemas/EmailTemplateWhereInputSchema'

export const EmailTemplateDeleteManyArgsSchema: z.ZodType<Prisma.EmailTemplateDeleteManyArgs> = z.object({
  where: EmailTemplateWhereInputSchema.optional(),
}).strict() ;

export default EmailTemplateDeleteManyArgsSchema;
