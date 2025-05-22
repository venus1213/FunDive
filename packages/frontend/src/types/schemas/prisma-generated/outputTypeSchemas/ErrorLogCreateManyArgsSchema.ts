import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogCreateManyInputSchema } from '../inputTypeSchemas/ErrorLogCreateManyInputSchema'

export const ErrorLogCreateManyArgsSchema: z.ZodType<Prisma.ErrorLogCreateManyArgs> = z.object({
  data: z.union([ ErrorLogCreateManyInputSchema,ErrorLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ErrorLogCreateManyArgsSchema;
