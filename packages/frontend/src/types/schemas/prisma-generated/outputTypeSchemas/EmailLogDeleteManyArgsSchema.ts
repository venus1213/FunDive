import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogWhereInputSchema } from '../inputTypeSchemas/EmailLogWhereInputSchema'

export const EmailLogDeleteManyArgsSchema: z.ZodType<Prisma.EmailLogDeleteManyArgs> = z.object({
  where: EmailLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailLogDeleteManyArgsSchema;
