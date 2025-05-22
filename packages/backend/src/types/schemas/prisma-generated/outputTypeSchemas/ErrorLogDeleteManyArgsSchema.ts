import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogWhereInputSchema } from '../inputTypeSchemas/ErrorLogWhereInputSchema'

export const ErrorLogDeleteManyArgsSchema: z.ZodType<Prisma.ErrorLogDeleteManyArgs> = z.object({
  where: ErrorLogWhereInputSchema.optional(),
}).strict() ;

export default ErrorLogDeleteManyArgsSchema;
