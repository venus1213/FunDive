import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultWhereInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereInputSchema'

export const EmailABTestResultDeleteManyArgsSchema: z.ZodType<Prisma.EmailABTestResultDeleteManyArgs> = z.object({
  where: EmailABTestResultWhereInputSchema.optional(),
}).strict() ;

export default EmailABTestResultDeleteManyArgsSchema;
