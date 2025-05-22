import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestWhereInputSchema } from '../inputTypeSchemas/EmailABTestWhereInputSchema'

export const EmailABTestDeleteManyArgsSchema: z.ZodType<Prisma.EmailABTestDeleteManyArgs> = z.object({
  where: EmailABTestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailABTestDeleteManyArgsSchema;
