import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogCreateManyInputSchema } from '../inputTypeSchemas/ErrorLogCreateManyInputSchema'

export const ErrorLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ErrorLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ ErrorLogCreateManyInputSchema,ErrorLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ErrorLogCreateManyAndReturnArgsSchema;
